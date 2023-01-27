import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DevTool } from "@hookform/devtools";

import * as z from 'zod';

import { Button } from '../../components/Button/Button';
import { Fieldset } from '../../components/fields/Fieldset/Fieldset';
import { Input } from '../../components/fields/Input/Input';
import { Textarea } from '../../components/fields/Textarea/Textarea';

const schema = z.object({
  title: z.string().min(3, { message: 'Title is required' }),
  description: z.string().min(3, { message: 'Description is required' }),
});

interface TestFieldArray {
  col1: string,
  col2: string,
  col3: string,
}

interface FormData {
  title: string,
  description: string,
  test: any[],
}

const defaultValues: FormData = {
  title: '',
  description: '',
  test: [
    {
      col1: '',
      col2: '',
      col3: '',
    },
  ],
}

export const FormRoute = (): JSX.Element => {
  const [formData, setFormData] = useState<FormData>({} as FormData);

  const { control, getValues, handleSubmit, register, reset, formState, formState: { errors } } = useForm<FormData>({
    defaultValues,
    resolver: zodResolver(schema),
    mode: 'all',
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "test"
  });

  useEffect(() => {
    setFormData(getValues());
  }, []);

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
          render={({ field: { onChange, value }, fieldState: { invalid, error } }) => (
            <Input
              id="title"
              name="title"
              label="Title"
              value={value}
              onChange={onChange}
              errors={error}
            />
          )}
          defaultValue=""
        />

        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value }, fieldState: { invalid, error } }) => (
            <Textarea
              id="description"
              name="description"
              label="Description"
              value={value}
              onChange={onChange}
              errors={error}
            />
          )}
          defaultValue=""
        />

        {fields.map((item, index) => (
          <Fieldset legend={`Field Array ${index + 1}`} key={item.id}>
            <Controller
                render={({ field }) => <Input label="Column 1" {...field} />}
                name={`test.${index}.col1`}
                control={control}
              />
              <Controller
                render={({ field }) => <Input label="Column 2" {...field} />}
                name={`test.${index}.col2`}
                control={control}
              />
              <Controller
                render={({ field }) => <Input label="Column 3" {...field} />}
                name={`test.${index}.col3`}
                control={control}
              />

              <Button type="button" onClick={() => {
                remove(index);
                setFormData(getValues());
              }}>Delete</Button>
          </Fieldset>
        ))}

        <button
          type="button"
          onClick={() => {
            append({ col1: '', col2: '', col3: '' });
            setFormData(getValues());
          }}
        >Append</button>

        <Button>Submit</Button>
      </form>

      <hr />

      <pre>{JSON.stringify(formData, null, 2)}</pre>
      <DevTool control={control} />
    </>
  );
};
