import { useEffect, useState, memo, Key } from "react";
import Modal from "../Modal";
import { Button, Calendar, Input, Tab, Tabs } from "@nextui-org/react";
import { userServices } from "@/services/user";
import { useUIStore } from "@/stores/ui";
import { toast } from "react-toastify";

export default function AuthModal() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [dob, setDob] = useState<string>("");
  const { login, register } = userServices();
  const { closeModal, modalData, openModal } = useUIStore();
  const [authView, setAuthView] = useState<string>(
    modalData.initialType || "login"
  );
  const authTypes = ["login", "register"];

  const layout = (type: string) => {
    switch (type) {
      case "login":
        return {
          title: "Login",
          fields: [
            {
              key: "email",
              type: "email",
              label: "Email",
              value: email,
              onValueChange: setEmail,
              isRequired: true,
            },
            {
              key: "password",
              type: "password",
              label: "Password",
              value: password,
              onValueChange: setPassword,
              isRequired: true,
            },
          ],
        };
      case "register":
        return {
          title: "Register",
          fields: [
            {
              key: "username",
              type: "text",
              label: "Username",
              value: username,
              onValueChange: setUsername,
              isRequired: true,
            },
            {
              key: "email",
              type: "email",
              label: "Email",
              value: email,
              onValueChange: setEmail,
              isRequired: true,
            },
            {
              key: "password",
              type: "password",
              label: "Password",
              value: password,
              onValueChange: setPassword,
              isRequired: true,
            },
            // {
            //   key: "dob",
            //   value: dob,
            //   onValueChange: setDob,
            //   isRequired: true,
            // },
          ],
        };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { initialType } = modalData;
    switch (initialType) {
      case "login":
        await login({ email, password });
        closeModal();
        toast.success("Logged in");
        break;
      case "register":
        const res = await register({ username, email, password });
        console.log(res);
        closeModal();
        toast.success("Registered successfully");
    }
  };

  return (
    <Modal
      title=""
      className="capitalize"
      showActions={false}
      body={
        <Tabs
          onSelectionChange={(e: Key) => setAuthView(e.toString())}
          selectedKey={authView}
        >
          {authTypes &&
            authTypes.map((type) => (
              <Tab key={type} title={layout(type)?.title}>
                <form onSubmit={handleSubmit}>
                  {layout(type) &&
                    layout(type)?.fields.map(
                      ({
                        key,
                        type,
                        label,
                        value,
                        onValueChange,
                        isRequired,
                      }) => (
                        // key !== "dob" ?
                        <Input
                          key={key}
                          type={type}
                          variant="bordered"
                          label={label}
                          value={value}
                          onValueChange={onValueChange}
                          isRequired={isRequired}
                          className="mb-4"
                        />
                      )
                      // : <Calendar showMonthAndYearPickers value={value} onValueChange={onValueChange}  />
                    )}
                    <div className='flex justify-end w-full'>
                    <Button type="submit" variant="flat" color="primary">Submit</Button>
                    </div>
                </form>
              </Tab>
            ))}
        </Tabs>
      }
      submitText={authView}
      onSubmit={handleSubmit}
    />
  );
}
