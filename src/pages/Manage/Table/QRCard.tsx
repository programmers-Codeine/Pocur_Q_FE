import { Print } from '@/assets/icons';
import QRCode from 'react-qr-code';

interface Props {
  tableNo: number;
  qrUrl: string;
}

export default function QRCard({ tableNo, qrUrl }: Props) {
  return (
    <div className="max-w-1/6 flex min-h-[240px] min-w-[240px] flex-col gap-2 rounded-lg border border-d900 px-4 py-2">
      <div className="flex justify-between">
        <div className="text-2xl font-semibold text-d900">{tableNo}번</div>
        <button
          className="flex h-[30px] w-[30px] items-center justify-center rounded-xl border border-d900 bg-b300 text-d10"
          onClick={() => {}}
        >
          <Print />
        </button>
      </div>
      <div className="w-11/12 flex-1 self-center bg-d200" id={`qrDiv${tableNo}`}>
        <QRCode value={qrUrl} className="qr h-full w-full border-none" />
      </div>
    </div>
  );
}
