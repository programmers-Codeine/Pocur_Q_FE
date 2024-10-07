import { Print } from '@/assets/icons';

interface Props {
  tableNo: number;
}

export default function QRCard({ tableNo }: Props) {
  // TODO print 기능 추가 필요
  // TODO url을 통해 QR 구현 추가 필요
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
      <div className="w-11/12 flex-1 self-center bg-d200">
        <img src="" alt="qr 이미지" />
      </div>
    </div>
  );
}
