export interface Database {
  connect(): Promise<void> | void;
  connection?();
}