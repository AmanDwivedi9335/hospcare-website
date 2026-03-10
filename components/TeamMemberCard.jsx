import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";

const TeamMemberCard = ({ member, index }) => {
	return (
		<motion.div
			className="rounded-3xl p-6 custom-shadow bg-teal-100"
			initial={{ opacity: 0, y: 50 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.5, delay: index * 0.2 }}
		>
			<div className="team-member">
				<motion.div
					className="member-image-container"
					whileHover={{ scale: 1.05 }}
					transition={{ type: "spring", stiffness: 300 }}
				>
					<div className="member-image-wrapper">
						<Image
							src={member.image}
							alt={member.name}
							width={300}
							height={300}
							className="rounded-full max-w-[200px] max-h-[200px] object-cover border-5 border-teal-300"
						/>
					</div>
				</motion.div>
				<div className="browser-dots">
					<div className="dot"></div>
					<div className="dot"></div>
					<div className="dot"></div>
				</div>

				<div className="member-info">
					<motion.a
						href={member.linkedinUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="social-link"
						whileHover={{ y: -5 }}
					>
						<Linkedin size={18} />
					</motion.a>
					<h3 className="text-xl font-semibold mt-2">{member.name}</h3>
					<p className="position">{member.position}</p>
					<p className="expertise">{member.expertise}</p>
				</div>
			</div>
		</motion.div>
	);
};

export default TeamMemberCard;
