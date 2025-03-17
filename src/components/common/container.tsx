interface ContainerProps {
  children: React.ReactNode;
}
export default function Container({ children }: ContainerProps) {
  return (
    <div className="w-full max-w-[800px] mx-auto pb-10">
      <div className="mt-[20vh]">{children}</div>
    </div>
  );
}
