// import styles from "./CountryDetails.module.css";
// import PaymentCard from "../PaymentCard/PaymentCard";
// import { useEffect, useState } from "react";
// import { getCountryData } from "@/api/visa";

// const cardData = {
//   cardHeading: "Apply Now",
//   isButton: true,
// };

// const CountryDetails = ({ countryName }) => {
//   const [countryDetails, setCountryDetails] = useState("");

//   console.log("countryName", countryName);

//   const fetchCountry = async (country) => {
//     try {
//       const response = await getCountryData("Afghanistan");
//       console.log("country data:", response.data);
//       setCountryDetails(response.data);
//     } catch (error) {
//       console.error("Error fetching Resident data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchCountry(countryName);
//   }, [countryName]);

//   return (
//     <div>
//       <div className={styles.countryDetailsContainer}>
//         <div className={styles.countryDescription}>
//           <h1>Portugal</h1>
//           <p>
//             Lorem ipsum dolor sit amet consectetur. Rutrum nec lectus dui
//             dignissim lorem consectetur a. Et tristique sit imperdiet nunc arcu
//             sapien amet. Ullamcorper volutpat augue vulputate risus mollis
//             turpis. Blandit sodales dolor neque risus amet in. Mi magna ac massa
//             vel purus tempus aenean. Malesuada augue semper in massa cursus.
//             Arcu senectus magna purus in pretium et. Amet quam non neque arcu
//             tempor faucibus mattis. Imperdiet at venenatis phasellus sed nec
//             pretium. Dapibus aliquet placerat consectetur nisl. Elit malesuada
//             nulla tortor eget porttitor hendrerit ut. Velit elit erat lobortis
//             at sit ante diam. Urna nunc elit odio at lectus ac scelerisque
//             nascetur. Ut amet nec congue aliquam quis ut dolor leo cursus. Nam
//             odio justo ornare lorem tellus ultrices diam. Velit pharetra
//             malesuada dis eget. Id fringilla nunc nunc egestas. Amet imperdiet
//             ut mi libero malesuada mauris orci lectus. Placerat volutpat tellus
//             eu non. Iaculis nulla eget scelerisque posuere. Mattis placerat amet
//             rhoncus faucibus urna. Aenean pretium habitant sit dui egestas morbi
//             non. Enim nisi interdum pulvinar enim nulla. Cras ut vitae posuere
//             nunc ut scelerisque. Feugiat lacinia scelerisque mi aliquam nulla
//             urna. Ac sit dui nullam at dui. Dolor nunc duis fermentum risus cras
//             nullam consectetur magna. Mauris sed non eu feugiat sit rhoncus.
//             Hendrerit sit semper leo feugiat ornare. Aenean dui porttitor
//             convallis rutrum eget in orci scelerisque ut. Posuere eget lectus
//             fringilla lorem ultricies pharetra nisl. Hac fermentum purus mi
//             integer id eleifend nullam. Bibendum posuere enim hac dignissim.
//             Neque sodales aliquam dignissim bibendum ac fringilla neque
//             fermentum. Lobortis facilisis magna convallis nunc sapien venenatis
//             aenean. Enim eu tellus sed tellus. At sed orci ac amet faucibus non
//             mi. Semper vulputate urna eros gravida rutrum turpis. Porttitor
//             convallis ut in elit pharetra et quis pharetra volutpat. Aenean
//             phasellus ornare ipsum duis scelerisque dolor sit accumsan. Massa
//             metus etiam nisl adipiscing nulla sem dui aenean. Tincidunt proin
//             nec id rutrum vivamus. Lectus odio eget mauris nec justo nunc
//             consequat. Gravida id facilisis condimentum tellus id sagittis.
//             Ornare volutpat tincidunt molestie non massa ipsum tellus. Quis ut
//             duis lorem nisi dapibus at. Libero egestas nulla orci convallis nam
//             lorem faucibus. Augue id scelerisque sit non vel. Ullamcorper
//             convallis at morbi nec. Libero et et sodales at turpis et.
//             Ullamcorper sit viverra sed nec in. In gravida amet id eget non
//             elementum amet tempor. Elit orci lectus nulla diam. Ultricies tortor
//             commodo massa morbi lectus praesent laoreet. Enim vestibulum feugiat
//             dictum massa vestibulum. Ultrices pretium turpis tincidunt aliquet
//             quis odio morbi a felis. Lectus condimentum molestie elementum
//             lectus viverra convallis donec sodales. Sit integer ac tellus nibh
//             morbi praesent aliquet sem sed. Erat ultrices aliquam et ultrices eu
//             tincidunt metus. Faucibus dictumst nisl turpis cursus. Est eget
//             pharetra velit eget viverra ultrices. Nullam vitae platea amet arcu
//             pellentesque. Eget sit ut id ornare pharetra. Molestie est est nisl
//             aliquet consequat in ligula morbi accumsan. Nulla etiam risus
//             fringilla tempor suscipit nam sem. Cras volutpat egestas viverra
//             erat ipsum sem molestie aliquet netus. In leo ut pretium purus
//             felis. Sagittis neque at lacus aliquam duis ultrices euismod
//             euismod. Sed lectus tortor congue ornare cras proin. Lobortis porta
//             consectetur non fringilla justo. Elementum ullamcorper augue porta
//             dolor ut faucibus. Purus tellus viverra vulputate viverra egestas.
//             Leo vitae nisi ultrices at sed magnis. Volutpat proin dolor ac
//             interdum pharetra ac tristique. Tempus tortor nisl pretium tortor
//             venenatis eleifend lectus dui. Quam sodales odio ullamcorper
//             pulvinar sed. Proin ultrices nunc et duis amet. Semper vel
//             scelerisque massa netus etiam amet velit phasellus. Nunc in dictum
//             dolor et pulvinar aliquam diam cursus. Nibh erat viverra at turpis
//             viverra. Diam dolor vel ullamcorper purus nibh proin nulla. Nisl
//             pellentesque posuere semper condimentum a amet justo. Auctor purus
//             purus suscipit aenean tincidunt tempor orci. In quam est aliquam
//             tellus massa pulvinar dui mi eleifend. Iaculis dictumst nullam amet
//             leo nisl. Proin id leo elit ipsum purus eu. Non ut tortor dictum
//             sed. Adipiscing sem amet faucibus pretium tincidunt nullam proin.
//             Eget commodo donec nibh eu. Et nunc sagittis elit volutpat at sit.
//             Eget neque a dictumst arcu. Odio etiam odio elementum enim euismod
//             id varius sodales. Nisl ut commodo quam at volutpat nibh tincidunt.
//             Volutpat at tempor facilisis donec mattis fusce in. Leo vestibulum
//             lobortis tellus mi vestibulum fringilla in. In tempus pretium lectus
//             ut dis sit duis fringilla. Eu facilisis porttitor iaculis venenatis
//             a molestie vestibulum. Fusce ornare pellentesque integer et posuere
//             in arcu condimentum mattis. Habitant ultrices purus faucibus quis
//             sit netus ut. Nisi turpis consectetur vitae adipiscing ac et aliquam
//             accumsan. Sed aliquam in non nulla in. Neque adipiscing at elementum
//             tellus at auctor in id habitant. Aliquam adipiscing lectus sed nibh
//             sit eget egestas at. Iaculis lacus facilisi malesuada ullamcorper.
//             Vel blandit blandit vulputate vitae mauris lectus tellus auctor
//             sociis. Tortor mollis vel vitae sit et mauris imperdiet. Tellus nunc
//             in turpis porta amet. Accumsan tellus maecenas nam augue et dictumst
//             ut mattis. Cursus arcu mattis gravida a proin volutpat amet vitae.
//             Volutpat pulvinar morbi bibendum sed suspendisse laoreet lorem sit
//             metus. Dolor rhoncus quis sit quis auctor in accumsan. Consequat eu
//             bibendum mauris vitae. Quam et nullam ac eget nunc purus nisi
//             ullamcorper felis. Nisl sapien aliquet pellentesque augue mattis
//             risus quis blandit eget. Pharetra commodo maecenas velit risus enim
//             imperdiet urna in semper. Adipiscing tempor in sit suscipit praesent
//             quam. Viverra et consequat velit nulla sit pellentesque accumsan
//             nunc. Tincidunt odio a ut enim hendrerit. Neque odio quis semper
//             pharetra nisl sed turpis et interdum. Pellentesque mauris quis
//             tempor neque. Venenatinisl. Nunc semper phasellus amet arcu turpis
//             egestas massa risus et. Morbi quam scelerisqu
//           </p>
//         </div>
//         <PaymentCard cardData={cardData} />
//       </div>
//     </div>
//   );
// };

// export default CountryDetails;

import styles from "./CountryDetails.module.css";
import PaymentCard from "../PaymentCard/PaymentCard";
import { useEffect, useState } from "react";

const cardData = {
  cardHeading: "Apply Now",
  isButton: true,
};

const CountryDetails = ({ country }) => {
  return (
    <div>
      <div className={styles.countryDetailsContainer}>
        <div className={styles.countryDescription}>
          <h1>{country.country_name}</h1>
          <p>{country.description}</p>
        </div>
        { country.visa_type !== 'visa_free' && (
          <PaymentCard cardData={cardData} price={country.price_per_person} active={country.active} />
        )}
      </div>
    </div>
  );
};

export default CountryDetails;
