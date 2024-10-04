import clsx from 'clsx';
import DesignCard from '@/components/common/Card/DesignCard';
import useContextMenuStore from '@/stores/useContextMenuStore';
import ContextOptions from '@/components/common/Options/ContextOptions';
import useDesignStore from '@/stores/useDesignStore';
import { ChangeEvent, MouseEvent, useState } from 'react';
import Input from '@/components/common/Input/Input';
import { InputDesignFormTypes } from '@/types';
import Button from '@/components/common/Button/Button';
import { NoImage } from '@/assets/icons';

const DEFAULT_OPTIONS = [
  { id: 1, name: '적용하기' },
  { id: 2, name: '수정하기' },
  { id: 3, name: '삭제하기' },
];

const NAVIGATION_DESIGN = [
  { id: 2, name: '소개/로딩/결제' },
  { id: 3, name: '메뉴판' },
  { id: 4, name: '메뉴상세' },
  { id: 5, name: '장바구니 및 결제' },
];

export default function DesignPage() {
  const [inputDesignForm, setInputDesignForm] = useState<InputDesignFormTypes>({
    designName: '',
    designImage: '',
    theme: {
      all: {
        background: '',
        largeText: '',
        smallText: '',
        box: '',
        boxOutline: '',
        icon: '',
      },
      button: {
        normal: {
          background: '',
          textAndIcon: '',
          outline: '',
        },
        active: {
          background: '',
          textAndIcon: '',
          outline: '',
        },
      },
      addOption: {
        label: {
          hot: '',
          new: '',
          soldOut: '',
        },
      },
    },
  });

  const { openMenu, isVisible, parentId } = useContextMenuStore();
  const { designs, selected, setSelect, navigation, navigate, deleteDesign } = useDesignStore();

  const handleSetInputDesignForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setInputDesignForm(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleOpenDesignOptions = (e: MouseEvent, id: number) => {
    const { clientX: x, clientY: y } = e;
    openMenu(id, x, y);
  };

  const handleDesignCards = (id: number) => {
    if (id === 1) {
      setSelect(parentId);
    } else if (id === 2) {
    } else if (id === 3) {
      if (parentId === 1) {
        //TODO: default Design can't delete.
        // 혹은, 아예 parentId가 1인경우에는 보여주지 않는 걸로.
      } else {
        deleteDesign(parentId);
      }
    }
  };

  const handleNavigate = (page: number) => {
    navigate(page);
  };

  return (
    <>
      {navigation === 1 && (
        <div className="flex gap-4">
          {designs.map(({ id, title, edit }) => (
            <DesignCard
              key={id}
              title={title}
              edit={id === selected ? '적용 중' : edit}
              state={id === selected ? 'active' : 'normal'}
              onContextMenu={e => handleOpenDesignOptions(e, id)}
            />
          ))}
          <DesignCard state="none" onClick={() => handleNavigate(2)} />
        </div>
      )}

      {navigation >= 2 && (
        <div className="flex h-full">
          <div className="flex h-full w-[50%] flex-col justify-between">
            <div className="flex flex-col gap-4 overflow-scroll">
              <div>
                <Input
                  id="designName"
                  type="text"
                  placeholder="디자인 이름을 적어주세요."
                  value={inputDesignForm.designName}
                  handleInputChange={handleSetInputDesignForm}
                  label="디자인 이름"
                />
              </div>
              <div>
                <label className="text-em font-semibold">디자인 이미지 설정</label>
                <div className="my-2 flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed py-4">
                  <NoImage />
                  <p className="text-d200">이미지 업로드</p>
                </div>
              </div>
              <p className="text-xl font-semibold">테마 설정</p>

              <div className="flex items-center gap-3 border-b-2 border-d50 px-2 pb-4 pt-2">
                <div className="min-w-[100px]">
                  <p className="text-lg font-bold">전체</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <div className="flex w-[160px] items-center justify-between rounded-lg border border-d50 bg-d30 px-4 py-2">
                    <p className="min-w-[100px]">배경</p>
                    <div className="h-4 w-4 border border-d10" />
                  </div>
                  <div className="flex w-[160px] items-center justify-between rounded-lg border border-d50 bg-d30 px-4 py-2">
                    <p className="min-w-[100px]">큰 텍스트</p>
                    <div className="h-4 w-4 border border-d10" />
                  </div>
                  <div className="flex w-[160px] items-center justify-between rounded-lg border border-d50 bg-d30 px-4 py-2">
                    <p className="min-w-[100px]">작은 텍스트</p>
                    <div className="h-4 w-4 border border-d10" />
                  </div>
                  <div className="flex w-[160px] items-center justify-between rounded-lg border border-d50 bg-d30 px-4 py-2">
                    <p className="min-w-[100px]">박스</p>
                    <div className="h-4 w-4 border border-d10" />
                  </div>
                  <div className="flex w-[160px] items-center justify-between rounded-lg border border-d50 bg-d30 px-4 py-2">
                    <p className="min-w-[100px]">박스 테두리</p>
                    <div className="h-4 w-4 border border-d10" />
                  </div>
                  <div className="flex w-[160px] items-center justify-between rounded-lg border border-d50 bg-d30 px-4 py-2">
                    <p className="min-w-[100px]">아이콘</p>
                    <div className="h-4 w-4 border border-d10" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 border-b-2 border-d50 px-2 pb-4 pt-2">
                <div className="flex items-center gap-3">
                  <div className="min-w-[100px]">
                    <p className="text-lg font-bold">버튼</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex w-[160px] items-center justify-between rounded-lg border border-d50 bg-d30 px-4 py-2">
                      <p className="min-w-[100px]">배경</p>
                      <div className="h-4 w-4 border border-d10" />
                    </div>
                    <div className="flex w-[160px] items-center justify-between rounded-lg border border-d50 bg-d30 px-4 py-2">
                      <p className="min-w-[100px]">텍스트/아이콘</p>
                      <div className="h-4 w-4 border border-d10" />
                    </div>
                    <div className="flex w-[160px] items-center justify-between rounded-lg border border-d50 bg-d30 px-4 py-2">
                      <p className="min-w-[100px]">테두리</p>
                      <div className="h-4 w-4 border border-d10" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="min-w-[100px]">
                    <p className="text-lg font-bold">버튼 활성화</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex w-[160px] items-center justify-between rounded-lg border border-d50 bg-d30 px-4 py-2">
                      <p className="min-w-[100px]">배경</p>
                      <div className="h-4 w-4 border border-d10" />
                    </div>
                    <div className="flex w-[160px] items-center justify-between rounded-lg border border-d50 bg-d30 px-4 py-2">
                      <p className="min-w-[100px]">텍스트/아이콘</p>
                      <div className="h-4 w-4 border border-d10" />
                    </div>
                    <div className="flex w-[160px] items-center justify-between rounded-lg border border-d50 bg-d30 px-4 py-2">
                      <p className="min-w-[100px]">테두리</p>
                      <div className="h-4 w-4 border border-d10" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 border-b-2 border-d50 px-2 pb-4 pt-2">
                <div className="min-w-[100px]">
                  <p className="text-lg font-bold">추가 옵션</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <div className="flex w-[160px] items-center justify-between rounded-lg border border-d50 bg-d30 px-4 py-2">
                    <p className="min-w-[100px]">라벨[HOT]</p>
                    <div className="h-4 w-4 border border-d10" />
                  </div>
                  <div className="flex w-[160px] items-center justify-between rounded-lg border border-d50 bg-d30 px-4 py-2">
                    <p className="min-w-[100px]">라벨[NEW]</p>
                    <div className="h-4 w-4 border border-d10" />
                  </div>
                  <div className="flex w-[160px] items-center justify-between rounded-lg border border-d50 bg-d30 px-4 py-2">
                    <p className="min-w-[100px]">라벨[품절]</p>
                    <div className="h-4 w-4 border border-d10" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Button title="생성하기" type="others" />
            </div>
          </div>
          <div className="flex h-full w-[50%] flex-col items-center gap-1">
            <div className="flex min-h-[36px] gap-2">
              {NAVIGATION_DESIGN.map(({ id, name }) => (
                <div
                  className={clsx(
                    'h-fit cursor-pointer px-2 py-1',
                    id === navigation
                      ? 'rounded-lg bg-b300 font-semibold text-d10'
                      : 'hover:border-b-4'
                  )}
                  key={id}
                  onClick={() => handleNavigate(id)}
                >
                  <p>{name}</p>
                </div>
              ))}
            </div>
            <div className="bg-deviceFrame relative aspect-[412/912] w-[50%] bg-contain bg-center bg-no-repeat">
              <div className="absolute inset-0 px-[2%] py-[15%]">
                {/* TODO: navigation에 따른 디자인적 요소 보여주기 */}
                {navigation === 2 && <div>소개/로딩/결제</div>}
                {navigation === 3 && <div>메뉴판</div>}
                {navigation === 4 && <div>메뉴상세</div>}
                {navigation === 5 && <div>장바구니 및 결제</div>}
              </div>
            </div>
          </div>
        </div>
      )}
      {isVisible && <ContextOptions options={DEFAULT_OPTIONS} onClick={handleDesignCards} />}
    </>
  );
}
