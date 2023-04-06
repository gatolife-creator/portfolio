import { motion } from "framer-motion";

const Card = ({
  src,
  title,
  description,
  link,
  className,
}: {
  src: string;
  title: string;
  description: string;
  link: string;
  className?: string;
}) => {
  return (
    <motion.a
      className={`card w-96 h-60 bg-base-100 shadow-xl image-full my-4 ${
        className && className
      }`}
      href={link}
      target="_blank"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <figure>
        <img src={src} alt={title} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
      </div>
    </motion.a>
  );
};

export default Card;
