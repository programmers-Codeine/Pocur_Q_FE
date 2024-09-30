const downloadQR = (tableNo: number) => {
  // 개별 QR 다운로드
  const svg = document.querySelector(`#qrDiv${tableNo} svg`) as SVGSVGElement;
  const data = new XMLSerializer().serializeToString(svg!);
  const svgBlob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);
  const img = new Image();

  img.addEventListener('load', () => {
    const canvas = document.createElement('canvas');

    canvas.width = 500;
    canvas.height = 500;

    const context = canvas.getContext('2d');

    context?.drawImage(img, 0, 0, 500, 500);

    URL.revokeObjectURL(url);

    const a = document.createElement('a');

    a.download = `${tableNo}번 QR`;
    document.body.appendChild(a);
    a.href = canvas.toDataURL();
    a.click();
    a.remove();
  });

  img.src = url;
};
