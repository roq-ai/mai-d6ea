import * as yup from 'yup';

export const connectionValidationSchema = yup.object().shape({
  user_id: yup.string().nullable().required(),
  connected_user_id: yup.string().nullable().required(),
});
