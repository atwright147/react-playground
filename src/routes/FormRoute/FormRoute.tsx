import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '../../components/fields/Input/Input';
import { Textarea } from '../../components/fields/Textarea/Textarea';

interface FormData {
  title: string,
  description: string,
}

export const FormRoute = (): JSX.Element => {
  const [formData, setFormData] = useState<FormData>({} as FormData);
  const { control, getValues, handleSubmit, reset } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data): void => {
    console.log(data);
  }

  const onChange = (): void => {
    setFormData(getValues());
  }

  return (
    <>
      <h1>React Hook Form Example</h1>

      <form onSubmit={handleSubmit(onSubmit)} onChange={onChange}>
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, value } }) => (
            <Input
              id="title"
              label="Title"
              value={value}
              onChange={onChange}
            />
          )}
          defaultValue=""
        />

        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <Textarea
              id="description"
              label="Description"
              value={value}
              onChange={onChange}
            />
          )}
          defaultValue=""
        />

      </form>

      <hr />

      <pre style={{ whiteSpace: 'pre-line' }}>{JSON.stringify(formData, null, 2)}</pre>
    </>
  );
};
