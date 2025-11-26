import AnimatedPage from "../../Components/UI/Animated-Container";
import ListHeader from "../../Components/UI/List-Header";
import { Contact } from "lucide-react";
import { UserPlus } from "lucide-react";
import Lists from "../../Components/Customer-List/Lists";
import AddUser from "../../Components/Customer-List/Add-user";
import { useState } from "react";

export default function CustomerList() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && <AddUser isOpen={isOpen} onExit={() => setIsOpen(false)} />}
      <AnimatedPage className="container">
        <ListHeader
          title="Customer Credit"
          addFunc={() => setIsOpen(true)}
          Icon={Contact}
          AddIcon={UserPlus}
        />
        <Lists />
      </AnimatedPage>
    </>
  );
}
