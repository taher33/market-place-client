import React, { ReactElement } from "react";
import { useForm } from "react-hook-form";

interface Props {}

interface Form {
  picture: any;
  description: string;
  details: string;
  price: number;
  categorie: string;
}

function CreateProduct({}: Props): ReactElement {
  const { handleSubmit, register } = useForm<Form>();
  const submitForm = async (data: Form) => {
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(submitForm)}>
        <input type="file" {...register("picture")} />
        <label htmlFor="description">description</label>
        <input type="text" {...register("description")} />
        <label htmlFor="details">details</label>
        <input type="text" {...register("details")} />
        <label htmlFor="price">price</label>
        <input type="number" {...register("price")} />
        <input type="search" {...register("categorie")} />
        <button type="submit"> submit</button>
      </form>
    </div>
  );
}

export default CreateProduct;
