import { Hotel, ReservationForm } from '@/models/hotel';
import { Fragment, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import FixedBottomButton from '../shared/FixedBottomButton';
import Select from '../shared/Select';
import Spacing from '../shared/Spacing';
import Text from '../shared/Text';
import TextField from '../shared/TextLabel';

type FormData = {
  [key: string]: string;
};

function Form({
  forms,
  onSubmit,
  buttonLabel,
}: {
  forms: Hotel['forms'];
  onSubmit: (formValues: FormData) => void;
  buttonLabel: string;
}) {
  const { register, formState, handleSubmit } = useForm<FormData>({
    mode: 'onBlur',
  });

  console.log('forms ===> ', forms);
  console.log('formState Errors ===> ', formState.errors);

  const component = useCallback(
    (form: ReservationForm) => {
      if (form.type === 'TEXT_FIELD') {
        return (
          <TextField
            label={form.label}
            helpMessage={
              (formState.errors[form.id]?.message as string) || form.helpMessage
            }
            hasError={formState.errors[form.id] != null}
            {...register(form.id, {
              required: form.required,
              pattern: VALIDATION_MESSAGE_MAP[form.id],
            })}
          />
        );
      } else if (form.type === 'SELECT') {
        return (
          <Select
            label={form.label}
            options={form.options}
            // hasError={formState.errors[form.id] != null}
            {...register(form.id, {
              required: form.required,
              pattern: VALIDATION_MESSAGE_MAP[form.id],
            })}
          />
        );
      } else {
        return null;
      }
    },
    [register, formState.errors],
  );

  return (
    <div style={{ padding: 24 }}>
      <Text bold={true}>예약 정보</Text>
      <Spacing size={10} />

      <form>
        {forms.map((form) => {
          return (
            <Fragment key={form.id}>
              {component(form)}
              <Spacing size={12} />
            </Fragment>
          );
        })}
      </form>
      <Spacing size={30} />
      <FixedBottomButton label={buttonLabel} onClick={handleSubmit(onSubmit)} />
    </div>
  );
}

const VALIDATION_MESSAGE_MAP: {
  [key: string]: { value: RegExp; message: string };
} = {
  name: {
    value: /^[가-힣]+$/,
    message: '※이름은 한글로만 입력해주세요. (예. 홍길동)',
  },
  phone: {
    value: /^01[016789]-?[0-9]{4}-?[0-9]{4}$/,
    message: '※전화번호 형식이 올바르지 않습니다. (예. 010-1234-5678)',
  },
  email: {
    value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9.-]+$/,
    message: '※이메일 형식이 올바르지 않습니다. (예. example@example.com)',
  },
};

export default Form;
