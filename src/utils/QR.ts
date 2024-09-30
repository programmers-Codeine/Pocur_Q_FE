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

const downloadAllQR = () => {
  // QR 전체 다운로드
  const svgs = document.querySelectorAll('#qrDiv svg.qr');

  if (svgs.length === 0) return;

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  const svgWidth = 500;
  const svgHeight = 500;
  const spacing = 50;
  const totalWidth = svgWidth * 2 + spacing;
  const totalHeight = (svgHeight + spacing) * Math.ceil(svgs.length / 2);

  canvas.width = totalWidth;
  canvas.height = totalHeight;

  svgs.forEach((svg, i) => {
    const data = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();

    img.onload = () => {
      context?.drawImage(
        img,
        (i % 2) * (svgWidth + spacing),
        Math.floor(i / 2) * (svgHeight + spacing),
        svgWidth,
        svgHeight
      );
      URL.revokeObjectURL(url);

      if (i === svgs.length - 1) {
        const a = document.createElement('a');
        a.download = 'allQR.png';
        a.href = canvas.toDataURL();
        a.click();
        a.remove();
      }
    };

    img.src = url;
  });
};
