function AccordionItem({ item, index, curOpen, onOpen }) {
  const isOpen = curOpen === index;

  const handleClick = function () {
    onOpen(isOpen ? null : index);
  };

  return (
    <li
      className={`accordionItem ${isOpen ? "active" : ""}`}
      onClick={handleClick}
    >
      <h2>{item.title}</h2>
      {isOpen && <p>{item.content}</p>}
      <span>{isOpen ? "-" : "+"}</span>
    </li>
  );
}

export default AccordionItem;
