
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import vacations from 'src/app/model/vac';
import { FollowersService } from 'src/app/Service/followers.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  allVacData: vacations[];
  followedItems: any[] = [];
  role: string;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  displayedVacData: vacations[] = [];
  defaultHeartColor: string = 'grey';
  showFollowingVacations: boolean = false;
  showUpcomingVacations: boolean = false;
  showFiltered: boolean = false;
  activeButton: string = ''; 
  showActiveVacations: boolean;
  clickedButtons: string[] = [];
  displayedVacations: any[] = []; 
  selectedFile: File | null = null;


  constructor(
    private http: HttpClient,
    private router: Router,
    private followersService: FollowersService,
    private cdr: ChangeDetectorRef
  ) {
    this.displayedVacData = []; 
    this.allVacData = [];

  }
  ngOnInit(): void {
    const storedItems = localStorage.getItem('userData');
    if (storedItems) {
      this.followedItems = JSON.parse(storedItems);
    }else {
      this.followedItems = [];
    }
    console.log('Followed Items:', this.followedItems); 
    this.showFollowingVacations = this.followedItems.length === 0;
    this.showUpcomingVacations = false;
    this.showActiveVacations = false;
    this.getAllVacData();
    this.fetchFollowedVacations();

  }
  
  fetchFollowedVacations(): void {
    const userData = localStorage.getItem('userData');
    if (userData) {
      this.role = JSON.parse(userData).role;
      const userId = JSON.parse(userData).id;
      const url = `http://localhost:4000/api/following/${userId}`;
      
      const storedFollowedItems = localStorage.getItem('followedItem');
      if (storedFollowedItems) {
        this.followedItems = JSON.parse(storedFollowedItems);
        this.getAllVacData();
        console.log(storedFollowedItems);
      } else {
        this.http.get<any[]>(url).subscribe(
          (data: any[]) => {
            const newFollowedItems = data.map(item => item.vacation_id); 
            localStorage.setItem('userData', JSON.stringify(newFollowedItems)); 
    
            const user = JSON.parse(userData);
            user.followedItems = newFollowedItems; 
            localStorage.setItem('userData', JSON.stringify(user));
    
            this.followedItems = newFollowedItems; 
            console.log('Data from FOLLOWING:', this.followedItems);
            this.getAllVacData(); 
  
          },
          (error) => {
            console.error('Error occurred while fetching FOLLOWING data:', error);
            this.getAllVacData(); 
          }
        );
      }
    } else {
      this.getAllVacData();
    }
  }
  
  filterFollowedItems(): void {
    this.activeButton = 'showAll';
    this.showFollowingVacations = !this.showFollowingVacations;
    this.showUpcomingVacations = false;
    this.showActiveVacations = false;
  
    this.updateDisplayedVacData();
  }
  
  filterUpcomingVacations(): void {
    this.activeButton = 'showUpcoming';
    this.showUpcomingVacations = !this.showUpcomingVacations;
  
    if (this.showUpcomingVacations) {
      this.clickedButtons.push('Show Upcoming Vacations');
      this.showFollowingVacations = false; 
      this.showActiveVacations = false;
  
      this.updateDisplayedVacData();
    } else {
      this.clickedButtons = this.clickedButtons.filter(name => name !== 'Show Upcoming Vacations');
    }
  }
  filterActiveVacations(): void {
    this.activeButton = 'showActive';
    this.showActiveVacations = !this.showActiveVacations;
      if (this.showActiveVacations) {
      this.clickedButtons.push('Show Active Vacations');
      this.showFollowingVacations = false; 
      this.showUpcomingVacations = false;
  
      this.updateDisplayedVacData();
    } else {
      this.clickedButtons = this.clickedButtons.filter(name => name !== 'Show Active Vacations');
    }
  }

  isVacationActive(vacation: vacations): boolean {
    const currentDate = new Date().getTime();
    const [day, month, year] = vacation.start_date.split('.');
    const startDate = new Date(Number(year), Number(month) - 1, Number(day)).getTime();

    const [endDay, endMonth, endYear] = vacation.end_date.split('.');
    const endDate = new Date(Number(endYear), Number(endMonth) - 1, Number(endDay)).getTime();

    return startDate <= currentDate && endDate >= currentDate;
  }
  getCurrentActiveVacations(): vacations[] {
    const currentDate = new Date().getTime();
    return this.allVacData.filter(vacation => this.isVacationActive(vacation));
  }
  

  getUpcomingVacations(): vacations[] {
    const currentDate = new Date().getTime();
    return this.allVacData.filter((vacation) => {
      const [day, month, year] = vacation.start_date.split('.');
      const startDate = new Date(Number(year), Number(month) - 1, Number(day)).getTime();
      return startDate > currentDate;
    });
  }

  getAllVacData(): void {
    const apiUrl = 'http://localhost:4000/api/vac/getAllVac';
    this.http.get<any[]>(apiUrl).subscribe(
      (data: any[]) => {
        this.allVacData = data;

        this.allVacData.sort((a, b) => {
          return this.compareDates(a.start_date, b.start_date);
        });

        this.allVacData.forEach(vacation => {
          vacation.start_date = this.convertToDateWithDots(vacation.start_date);
          vacation.end_date = this.convertToDateWithDots(vacation.end_date);
        });

        this.totalItems = this.allVacData.length;
        this.updateDisplayedVacData();

      },
      
      (error) => {
        console.error('Error occurred while fetching data:', error);
      }
    );
  }
  
  compareDates(date1: string, date2: string): number {
    const [day1, month1, year1] = date1.split('.');
    const [day2, month2, year2] = date2.split('.');
    
    const dateObj1 = new Date(Number(year1), Number(month1) - 1, Number(day1));
    const dateObj2 = new Date(Number(year2), Number(month2) - 1, Number(day2));
  
    if (dateObj1.getTime() < dateObj2.getTime()) {
      return -1;
    } else if (dateObj1.getTime() > dateObj2.getTime()) {
      return 1;
    } else {
      return 0;
    }
  }
  convertToDateWithDots(dateString: string): string {
    const [year, month, day] = dateString.split('-');
    const formattedDate = `${day}.${month}.${year}`;
    return formattedDate;
  }
  

  updateDisplayedVacData(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
  
    let filteredData: vacations[] = [];
  
    if (this.showFollowingVacations) {
      filteredData = this.allVacData.filter(vacation => this.followedItems.includes(vacation.id));
    } else if (this.showUpcomingVacations) {
      const currentDate = new Date().getTime();
      filteredData = this.allVacData.filter(vacation => {
        const [day, month, year] = vacation.start_date.split('.');
        const startDate = new Date(Number(year), Number(month) - 1, Number(day)).getTime();
        return startDate > currentDate;
      });
    } else if (this.showActiveVacations) {
      filteredData = this.allVacData.filter(vacation => this.isVacationActive(vacation));
    } else {
      filteredData = this.allVacData;
    }
  
    this.displayedVacData = filteredData.slice(startIndex, endIndex);
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.updateDisplayedVacData();
  }

  getPaginationRange(): number[] {
    const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  getTotalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }
  
updateFollow(): void {
  const url = `http://localhost:4000/api/updatefollow`;
  const body = "updated";

  this.http.put(url, body).subscribe(
    () => {
      console.log("Follow update successful");
      this.getAllVacData(); 
    },
    (error) => {
      console.error("Error updating follow:", error);
    }

  );
}
  isFollowActionInProgress: boolean = false;
getHeartIconColor(item: vacations): boolean {
  return this.followedItems.includes(item.id);
}
followItem(itemId: number): void {
  if (this.isFollowActionInProgress) {
    return;
  }
  this.isFollowActionInProgress = true; 

  const userData = localStorage.getItem('userData');
  if (userData) {
    const user = JSON.parse(userData);
    const followedItems = user.followedItems || [];
    const itemIndex = followedItems.indexOf(itemId);

    if (itemIndex > -1) {
      followedItems.splice(itemIndex, 1);
      this.followersService.deleteFollow(user.id, itemId).subscribe(
        () => {
          console.log(`Unfollowed vacation with ID ${itemId}`);
          user.followedItems = followedItems;
          localStorage.setItem('userData', JSON.stringify(user));
          this.isFollowActionInProgress = false; 

          const indexInDisplayedData = this.displayedVacData.findIndex((item) => item.id === itemId);
          if (indexInDisplayedData > -1) {
            this.displayedVacData[indexInDisplayedData].isFollowed = false;
          }
          this.fetchFollowedVacations();

        },
        (error) => {
          console.error(`Error unfollowing vacation ${itemId}:`, error);
          this.isFollowActionInProgress = false; 
        }
      );
    } else {
      if (!followedItems.includes(itemId)) { 
        followedItems.push(itemId);
        this.followersService.addFollow(user.id, itemId).subscribe(
          () => {
            console.log(`Followed vacation with ID ${itemId}`);
            user.followedItems = followedItems;
            localStorage.setItem('userData', JSON.stringify(user));
            this.isFollowActionInProgress = false; 

            const indexInDisplayedData = this.displayedVacData.findIndex((item) => item.id === itemId);
            if (indexInDisplayedData > -1) {
              this.displayedVacData[indexInDisplayedData].isFollowed = true;
            }       
            this.fetchFollowedVacations();

          },
          (error) => {
            console.error(`Error following vacation ${itemId}:`, error);
            this.isFollowActionInProgress = false; 
          }
        );
      }
    }
  }
}


  removeVac(id: number): void {
    const confirmDelete = window.confirm('Are you sure you want to delete this vacation?');
    if (confirmDelete) {
      const apiUrl = `http://localhost:4000/api/vac/deleteVac/${id}`;
      this.http.delete(apiUrl).subscribe(
        () => {
          console.log(`Vacation with ID ${id} removed successfully.`);
          this.allVacData = this.allVacData.filter((item) => item.id !== id);
          this.followersService.deleteFollow(id, id).subscribe(
            () => {
              console.log(`Unfollowed vacation with ID ${id}`);
              this.updateDisplayedVacData(); 
              this.router.navigate(['/list']);
            },
            (error) => {
              console.error(`Error occurred while unfollowing vacation with ID ${id}:`, error);
            }
          );
        },
        (error) => {
          console.error(`Error occurred while deleting vacation with ID ${id}:`, error);
        }
      );
    }
  }

  getVacById(id: number): void {
    const apiUrl = `http://localhost:4000/api/vac/${id}`;
    this.http.get(apiUrl).subscribe(
      (vacation) => {
        console.log(`Vacation with ID ${id}:`, vacation);
      },
      (error) => {
        console.error(`Error occurred while retrieving vacation with ID ${id}:`, error);
      }
    );
  }

  editVacation(id: number): void {
    this.getVacById(id);
    this.router.navigate(['/vac', id]); 
  };
  toggleFilter(filterType: string): void {
    if (this.activeButton === filterType) {
      this.activeButton = '';
    } else {
      this.activeButton = filterType;
    }
  
    switch (this.activeButton) {
      case 'showUpcoming':
        this.showUpcomingVacations = !this.showUpcomingVacations;
        break;
      case 'showAll':
        this.showFollowingVacations = !this.showFollowingVacations;
        break;
      case 'showActive':
        this.showActiveVacations = !this.showActiveVacations;
        break;
      default:
        this.showFollowingVacations = false;
        this.showUpcomingVacations = false;
        this.showActiveVacations = false;
    }
  
    this.updateDisplayedVacData();
  }
  
}  
