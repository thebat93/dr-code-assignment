import Image from "next/image";
import { CDN_URL } from "@/const";
import s from "./styles.module.css";

interface Props {
  title: string;
  description: string;
  image: {
    width: number;
    height: number;
    path: string;
  };
}

const Card = ({ title, description, image }: Props) => (
  <div className={s.card}>
    <Image
      className={s.image}
      src={`${CDN_URL}${image.path}`}
      width={image.width}
      height={image.height}
      loading="lazy"
      alt={title}
    />
    <div className={s.textContainer}>
      <p className={s.title}>{title}</p>
      <p>{description}</p>
    </div>
  </div>
);

export { Card };
