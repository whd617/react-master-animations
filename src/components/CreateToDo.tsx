import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { categoryState, toDoState } from './atoms';

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const onSubmit = ({ toDo }: IForm) => {
    setToDos((oldToDos) => {
      const updatedToDos = [
        { text: toDo, id: Date.now(), category },
        ...oldToDos,
      ];

      // localStorage에 저장
      localStorage.setItem('toDos', JSON.stringify(updatedToDos));

      return updatedToDos;
    });

    setValue('toDo', '');
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('toDo', { required: 'Please write a To Do' })}
        placeholder='Write a to do'
      />
      <button>Add</button>
    </form>
  );
}

export default CreateToDo;
