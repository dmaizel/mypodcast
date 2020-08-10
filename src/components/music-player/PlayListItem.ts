export class PlaylistItem {
  title: string;
  uri: string;
  image: string;

  constructor(title: string, uri: string, image: string) {
    this.title = title;
    this.uri = uri;
    this.image = image;
  }
}
