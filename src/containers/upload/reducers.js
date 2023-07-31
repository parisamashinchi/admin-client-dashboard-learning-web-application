import * as constants from "./constants";
import { createReducer } from "redux-immutablejs";
import { fromJS } from "immutable";
import reject from "lodash/reject";
import filter from "lodash/filter";

const initialState = fromJS({});

export default {
  [constants.UPLOAD]: createReducer(initialState, {
    [constants.SET_LOCAL_FILES]: (state, action) => {
      const files = state.getIn([`${action.payload.name}_files`], []);
      const localFiles = reject(action.payload.data, localFile =>
        files.find(file => file.url === localFile.url)
      );
      return state.merge({
        [`${action.payload.name}_files`]: [...files, ...localFiles]
      });
    },
    [constants.SET_UPLOADED_FILES]: (state, action) =>
      state.merge({
        [`${action.payload.name}_files`]: [
          ...state.getIn([`${action.payload.name}_files`], []).map(file => {
            const uploadedFile = action.payload.data.find(
              res =>
                file.name.includes(res.name) && file.size === Number(res.size)
            );
            return uploadedFile ? { ...uploadedFile, local: false } : file;
          })
        ]
      }),
    [constants.DELETE_FILE]: (state, action) =>
      state.merge({
        [`${action.payload.name}_files`]: filter(
          state.getIn([`${action.payload.name}_files`], []),
          file => {
            return file.id !== action.payload.id;
          }
        )
      }),
    [constants.LOADING]: (state, action) =>
      state.merge({
        [`${action.payload.name}_loading`]: action.payload.loading
      }),
    [constants.FAILURE]: (state, action) =>
      state.merge({
        [`${action.payload.name}_failed`]: true
      }),
    [constants.RESET_STATE]: (state, action) =>
      state.merge({
        [`${action.payload.name}_files`]: [],
        [`${action.payload.name}_loading`]: false,
        [`${action.payload.name}_failed`]: false
      })
  })
};

// [constants.SET_FILES]: (state, action) =>
//       state.merge({
//         [`${action.payload.name}_files`]: [
//           ...state.getIn([`${action.payload.name}_files`], []),
//           ...action.payload.data.map(file => ({
//             ...file,
//             id: get(
//               action.payload.localAssigns.find(
//                 ls =>
//                   ls.name.includes(file.name) && ls.size === Number(file.size)
//               ),
//               "id",
//               ""
//             )
//           }))
//         ]
//       }),
