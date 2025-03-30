import React, { FormEvent, FormEventHandler, useRef, useState } from "react";
import "../../components/styling/profile.css";
import { useUserInfo } from "../../hooks/useUserInfo.tsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthorizedClient } from "../../hooks/useAuthorizedClient/useAuthorizedClient.tsx";
import { UserObject } from "../../types.spec.ts";
import Loading from "../../components/Loader";

export default function Profile() {
  const client = useAuthorizedClient();
  const queryClient = useQueryClient();
  const uploadButton = useRef<HTMLInputElement>(null);
  const userInfo = useUserInfo().data
  const [avatar, setAvatar] = useState<string | undefined>(userInfo?.profilePicture);

  const { isPending, isError, error, mutate } = useMutation({
    mutationFn: (userData: Partial<UserObject>) => {
      return client.put(`/users/${userInfo?.username}`, userData);
    },
    onSuccess:()=> queryClient.invalidateQueries({ queryKey: ["userInfo"]})

});

  const getFromDataAfterSubmit: FormEventHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElements = e.currentTarget.elements as HTMLFormControlsCollection;

    const userData = {
      firstName: (formElements.namedItem("first_name") as HTMLInputElement).value,
      lastName: (formElements.namedItem("last_name") as HTMLInputElement).value,
      username: (formElements.namedItem("username") as HTMLInputElement).value,
      dob: (formElements.namedItem("dob") as HTMLInputElement).value,
      profilePicture: avatar
    };

    mutate(userData);

  };


  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };


  if (isPending) {
    return <div className="dashboard">
      <h1 className="dashboard__title">Account Information</h1>
      <hr />
      <Loading />
    </div>;
  }

  return (
    <div className="dashboard">
      <h1 className="dashboard__title">Account Information</h1>
      <hr />
      <div className="profile">
        <div className="profile__image">
          <img src={avatar || "https://placehold.co/150x150"} alt="profile" />
          <button className="styled__button" onClick={() => {
            uploadButton.current?.click();
          }}>Change
          </button>
          <input type="file" name="avatar" accept=".png, .svg, .jpg, .jpeg" onChange={handleUpload} hidden
                 ref={uploadButton} />
        </div>

        <form className="profile__content" onSubmit={getFromDataAfterSubmit}>
          <div className="input__container">
            <section>
              <div className="input__container">
                <div className="input__label">
                  <p>First Name</p>
                </div>
                <input type="text" className="input__field" name="first_name"
                       defaultValue={userInfo?.firstName} maxLength={150} id="id_first_name" />
              </div>

              <div className="input__container">
                <div className="input__label">
                  <p>Last Name</p>
                </div>
                <input type="text" className="input__field" name="last_name"
                       defaultValue={userInfo?.lastName} maxLength={150} id="id_last_name" />
              </div>
            </section>
            <section>
              <div className="input__container">
                <div className="input__label">
                  <p>User Name</p>
                </div>
                <input className="input__field" type="text" name="username"
                       defaultValue={userInfo?.username} autoCapitalize="none"
                       autoComplete="username" maxLength={150} required id="id_username" />
              </div>

              <div className="input__container">
                <div className="input__label">
                  <p>Account Type: </p>
                </div>
                <input className="input__field" type="date" name="dob" defaultValue={userInfo?.dob} />
              </div>
            </section>
          </div>
          {isError && (
            <section>
              <span style={{ color: "var(--error-dark)" }}>{error?.response.data.message}</span>
            </section>
          )}
          <div className="profile__submit">
            <button className="styled__button" type={"submit"}> Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
