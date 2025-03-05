import { useRef, useState } from 'react';
import "../../components/styling/profile.css"
export default function Profile() {
    const [avatar, setAvatar] = useState<string>("https://via.placeholder.com/150");
    const uploadButton = useRef<HTMLInputElement>(null);

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file){
            const reader = new FileReader()
            reader.onload = () => {
                setAvatar(reader.result as s)
            }

            reader.readAsDataURL(file)
        }

        console.log(avatar)
    };

    return ( 
        <div className="dashboard">
        <h1 className="dashboard__title">Account Information</h1>
        <hr />
            <div className="profile">
                <div className="profile__image">
                    <img src={avatar} alt="profile" />
                    <button className='styled__button' onClick={() => {uploadButton.current?.click()} }>Change</button>
                    <input type="file" name="avatar" accept=".png, .svg, .jpg, .jpeg" onChange={handleUpload} hidden ref={uploadButton}/>
                </div>

                <div className="profile__content">
                    <div className="input__container">
                    <section>
                        <div className="input__container">
                            <div className="input__label">
                                <p>First Name</p>
                            </div>
                            <input type="text" className="input__field" name="first_name" maxlength="150" id="id_first_name"/>

                        </div>

                        <div className="input__container">
                            <div className="input__label">
                                <p>Last Name</p>
                            </div>
                            <input type="text" className="input__field" name="last_name" maxlength="150" id="id_last_name"/>
                        </div>
                    </section>
                    <section>
                        <div className="input__container">
                            <div className="input__label">
                                <p>User Name</p>
                            </div>
                            <input className="input__field" type="text" name="username" autofocus="" autocapitalize="none"
                                autocomplete="username" maxlength="150" required id="id_username" />

                        </div>

                        <div className="input__container">
                            <div className="input__label">
                                <p>Account Type: </p>
                            </div>
                            <select className="input__field" name="user_type" id="user_type" onchange="toggleFields()">
                                <option value="student">Student</option>
                                <option value="staff">Staff</option>
                            </select>

                        </div>
                    </section>
                    </div>
                </div>

            </div>
        </div>
    );
}