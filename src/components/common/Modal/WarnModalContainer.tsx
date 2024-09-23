import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  iconUrl: string;
}

export default function WarnModalContainer({ children, iconUrl }: Props) {
  return (
    <div className="flex items-start gap-6 p-6 border border-d200 rounded-lg min-w-[440px] max-w-[550px]">
      <img className="w-8 h-8" src={iconUrl} alt="modal icon image" />
      <div className="flex flex-col flex-1">{children}</div>
    </div>
  );
}
