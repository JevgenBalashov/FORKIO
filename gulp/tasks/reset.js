// delete files and directory
import { deleteAsync } from 'del';

export const reset = () => {
  return deleteAsync(app.path.clean);
};
