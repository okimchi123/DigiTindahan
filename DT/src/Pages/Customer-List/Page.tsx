import AnimatedPage from "../../Components/UI/Animated-Container";
import ListHeader from "../../Components/UI/List-Header";
import { Contact } from "lucide-react";

export default function CustomerList() {
    return(
    <AnimatedPage>
        <ListHeader title="Customer Credit" addFunc={()=>console.log("add")} Icon={Contact}/>
    </AnimatedPage>
    )
}