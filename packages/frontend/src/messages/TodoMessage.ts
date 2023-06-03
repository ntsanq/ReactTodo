import { message } from "antd";

class TodoMessage {

  addSuccess(): void {
    message.success('Successfully added!');
  }

  addFailed(): void {
    message.error('Add failed!')
  }

  updateSuccess(): void {
    message.success('Updated!');
  }

  updateFailed(): void {
    message.error('Update failed!');
  }

  deleteSuccess(): void {
    message.success('Successfully deleted!');
  }

  deleteFailed(): void {
    message.error('Delete failed!');
  }

  completeSuccess(responseMessage: string): void {
    message.success(responseMessage);
  }

  completeFailed(): void {
    message.error('Delete failed!');
  }

  getAllFailed(): void {
    message.error(`There's a problem when getting your tasks!`);
  }

}

export default new TodoMessage();
