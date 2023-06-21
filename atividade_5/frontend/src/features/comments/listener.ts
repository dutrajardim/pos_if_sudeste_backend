import { AppStartListening } from "../../store";
import { fetchComments, submitComment } from "./commentsSlice";

export default function (startListening: AppStartListening) {
  startListening({
    actionCreator: submitComment.fulfilled,
    effect: async (_, listenerApi) => {
      listenerApi.dispatch(fetchComments())
    }
  })
}