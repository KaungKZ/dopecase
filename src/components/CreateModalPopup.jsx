import { Modal } from "@mantine/core";
import { cn } from "@/lib/utils";

export default function CreateModalPopup(props) {
  const { opened, close, cls } = props;
  return (
    <>
      <Modal opened={opened} onClose={close} className={cn(cls)}>
        {/* Modal content */}
        {props.children}
      </Modal>
    </>
  );
}
