import { ReactNode } from 'react'

interface IContainer {
  children: ReactNode
}

const Container = ({ children }: IContainer) => {
  return (
    <section className='bg-white m-5 flex-col place-items-center'>
      {children}
      <p className='mt-7 mx-auto w-1/2'>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia et magni
        quibusdam quod quisquam alias voluptates assumenda iusto ea facere! Sunt
        numquam perspiciatis rem illo ratione modi ullam harum corrupti.
      </p>
    </section>
  )
}

export default Container
