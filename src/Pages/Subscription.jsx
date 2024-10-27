import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { subscriptionService } from "../backend/config.js";
import SubscriptionCard from "../Components/CustomComponent/SubscriptionCard.jsx";
import { useSelector } from "react-redux";

const Subscription = () => {
  const { subscriberId } = useParams();
  const [subscribedChannels, setSubscribedChannels] = useState([]);
  const currentUser = useSelector((state) => state?.auth?.status);
  useEffect(() => {
    const mySubscriptions = async () => {
      if (!subscriberId) return;
      const response = await subscriptionService.getSubscribedChannels(
        subscriberId
      );
      if (response) {
        setSubscribedChannels(response?.data);
        console.log(response);
      }
    };
    mySubscriptions();
  }, [subscriberId]);
  return subscribedChannels?.length ? (
    <div className="top-20 space-y-2 absolute select-none">
      <p className="text-gray-400 text-3xl font-semibold mb-8">
        My Subscriptions(
        {subscribedChannels?.length >= 1000
          ? (subscribedChannels?.length / 1000).toFixed(1) + "k"
          : subscribedChannels?.length}
        )
      </p>
      {subscribedChannels.map((channel) => (
        <SubscriptionCard
          key={channel?._id}
          avatar={channel.channel?.avatar}
          username={channel.channel?.username}
        />
      ))}
    </div>
  ) : (
    <div className="max-h-screen items-center flex justify-center select-none">
      <p className="text-gray-400 transform translate-y-80">
        {!currentUser
          ? "Login to check subscriptions."
          : "No subscriptions found."}
      </p>
    </div>
  );
};

export default Subscription;
