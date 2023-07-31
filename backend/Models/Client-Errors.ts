export class ClientError {
  public status: number;
  public message: string;

  public constructor(status: number, message: string) {
    this.status = status;
    this.message = message;
  }
}

export class RouteNotFoundError extends ClientError {
  public constructor(route: string) {
    super(404, `route ${route} not found`);
  }
}

export class VideoNotFoundError extends ClientError {
  public constructor(videoID: string) {
    super(404, `video id:${videoID} was not found`);
  }
}

export class UserNotLoggedError extends ClientError {
  public constructor() {
    super(401, "User not authrized, please login...");
  }
}
