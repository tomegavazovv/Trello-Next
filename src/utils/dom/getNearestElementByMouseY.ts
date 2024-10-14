export function getNearestElementByMouseY(
  selector: string,
  mouseY: number,
  rootElement: Element = document.body
): HTMLElement{
  const elementsInColumn = Array.from(rootElement.querySelectorAll(selector));
  
  const result = elementsInColumn.reduce<{ offset: number; element: Element }>(
    (closest, element) => {
      const box = element.getBoundingClientRect();
      const offset = Math.abs(mouseY - (box.top + box.height / 2));

      if (offset < closest.offset) {
        return { offset, element };
      } else {
        return closest;
      }
    },
    { offset: Infinity, element: elementsInColumn[0] }
  );

  return result.element as HTMLElement;
}