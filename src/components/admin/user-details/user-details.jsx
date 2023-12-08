import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectUserDetails } from "../../../store/user-details/user-details.selector";

const UserDetails = () => {
    const userDetails = useSelector(selectUserDetails);
    console.log(userDetails);
    const { email } = useParams();
    console.log(email);

    return (
        <div>
            {userDetails
                .filter((user) => user.email === email)
                .map(({ displayName, email, birthday, city, number, skill, choisedPackage }) => (
                    <div>
                        <p>{displayName}</p> 
                        <p>{email}</p>
                        <p>{birthday}</p>
                        <p>{city}</p>
                        <p>{number}</p>
                        <p>{skill}</p>
                        <p>{choisedPackage}</p>
                    </div>
                ))}
        </div>
    );
};

export default UserDetails;