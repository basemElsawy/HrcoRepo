import React, { useState } from "react";
import styles from "./EditStyling.module.css";
import { useContext } from "react";
import { mainContext } from "../GlobalContext/globalContext";
import EditForm from "./EditForm";
const EditComponent = () => {
  const { roles }: any = useContext(mainContext);
  const [nameSetter, setName] = useState<string>();
  console.log(roles);
  return (
    <section className={styles.main_container}>
      <div>
        <h2>Edit On {nameSetter?.split(" ")[0]}</h2>
      </div>
      <div>
        <EditForm nameSetter={setName}></EditForm>
      </div>
    </section>
  );
};

export default EditComponent;
