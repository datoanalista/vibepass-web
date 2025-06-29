"use client";
import React from "react";
import styles from "./AttractionsSection.module.css";
import CategoryHeader from "../CategoryHeader/CategoryHeader";
import AttractionCard from "../AttractionCard/AttractionCard";
import { Attraction } from "@/data/Purchase/attractionsData";

interface AttractionsSectionProps {
  attractions: Attraction[];
  onQuantityChange: (attractionId: number, newQuantity: number) => void;
}

export default function AttractionsSection({
  attractions,
  onQuantityChange,
}: AttractionsSectionProps) {
  const heightRestrictionAttractions = attractions.filter(
    (attraction) => attraction.category === "heightRestriction",
  );
  const kidsZoneAttractions = attractions.filter(
    (attraction) => attraction.category === "kidsZone",
  );

  return (
    <div className={styles.container}>
      <CategoryHeader title="Atracciones" />

      <div className={styles.sectionsContainer}>
        {/* Height Restriction Section */}
        <div className={styles.categorySection}>
          <CategoryHeader subtitle="Desde 1,40 metros" title="" />
          <div className={styles.attractionsGrid}>
            {heightRestrictionAttractions.map((attraction) => (
              <AttractionCard
                key={attraction.id}
                name={attraction.name}
                description={attraction.description}
                price={attraction.price}
                imageUrl={attraction.imageUrl}
                quantity={attraction.quantity}
                onQuantityChange={(newQuantity) =>
                  onQuantityChange(attraction.id, newQuantity)
                }
              />
            ))}
          </div>
          <div className={styles.navigationContainer}>
            <button className={styles.navButton}>
              <svg
                width="41"
                height="41"
                viewBox="0 0 41 41"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.0563 21.141C15.8868 20.9713 15.8022 20.7733 15.8023 20.5472C15.8025 20.3211 15.8874 20.1233 16.0571 19.9538L20.8087 15.2086C21.0916 14.9262 21.4025 14.8557 21.7416 14.9972C22.0807 15.1388 22.2501 15.4074 22.2498 15.8031L22.2434 25.3C22.2432 25.6957 22.0734 25.9641 21.7341 26.1052C21.3949 26.2463 21.084 26.1754 20.8015 25.8926L16.0563 21.141ZM3.59207 20.539C3.59049 22.885 4.03446 25.0899 4.92396 27.1538C5.81347 29.2177 7.02029 31.0133 8.54442 32.5406C10.0685 34.0679 11.8625 35.2772 13.9264 36.1683C15.9902 37.0595 18.1945 37.5064 20.5394 37.5091C22.8842 37.5118 25.0891 37.0678 27.1541 36.1772C29.2192 35.2866 31.0148 34.0797 32.541 32.5568C34.0671 31.0338 35.2764 29.2398 36.1687 27.1748C37.0609 25.1098 37.5079 22.9055 37.5095 20.5618C37.511 18.2181 37.0671 16.0132 36.1776 13.947C35.288 11.8809 34.0812 10.0853 32.5571 8.56022C31.033 7.03517 29.239 5.82538 27.1752 4.93083C25.1113 4.03628 22.907 3.58992 20.5622 3.59173C18.2173 3.59355 16.0124 4.03752 13.9474 4.92363C11.8823 5.80975 10.0867 7.01656 8.56055 8.54408C7.03437 10.0716 5.82458 11.8656 4.93117 13.926C4.03775 15.9865 3.59139 18.1908 3.59207 20.539Z"
                  fill="#424040"
                />
              </svg>
            </button>
            <button className={styles.navButton}>
              <svg
                width="41"
                height="41"
                viewBox="0 0 41 41"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M25.0433 21.141C25.2128 20.9713 25.2974 20.7733 25.2973 20.5472C25.2971 20.3211 25.2122 20.1233 25.0425 19.9538L20.2909 15.2086C20.008 14.9262 19.6971 14.8557 19.358 14.9972C19.0189 15.1388 18.8495 15.4074 18.8498 15.8031L18.8562 25.3C18.8564 25.6957 19.0262 25.9641 19.3655 26.1052C19.7047 26.2463 20.0156 26.1754 20.2981 25.8926L25.0433 21.141ZM37.5075 20.539C37.5091 22.885 37.0652 25.0899 36.1756 27.1538C35.2861 29.2177 34.0793 31.0133 32.5552 32.5406C31.0311 34.0679 29.2371 35.2772 27.1732 36.1683C25.1094 37.0595 22.9051 37.5064 20.5603 37.5091C18.2154 37.5118 16.0105 37.0678 13.9455 36.1772C11.8804 35.2866 10.0848 34.0797 8.55864 32.5568C7.03247 31.0338 5.82324 29.2398 4.93095 27.1748C4.03867 25.1098 3.59173 22.9055 3.59016 20.5618C3.58858 18.2181 4.03255 16.0132 4.92206 13.947C5.81156 11.8809 7.01838 10.0853 8.54251 8.56022C10.0666 7.03517 11.8606 5.82538 13.9245 4.93083C15.9883 4.03628 18.1926 3.58992 20.5374 3.59173C22.8823 3.59355 25.0872 4.03752 27.1522 4.92363C29.2173 5.80975 31.0129 7.01656 32.5391 8.54408C34.0652 10.0716 35.275 11.8656 36.1684 13.926C37.0619 15.9865 37.5082 18.1908 37.5075 20.539Z"
                  fill="#424040"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Kids Zone Section */}
        <div className={styles.categorySection}>
          <CategoryHeader subtitle="Zona Kids" title="" />
          <div className={styles.attractionsGrid}>
            {kidsZoneAttractions.map((attraction) => (
              <AttractionCard
                key={attraction.id}
                name={attraction.name}
                description={attraction.description}
                price={attraction.price}
                imageUrl={attraction.imageUrl}
                quantity={attraction.quantity}
                onQuantityChange={(newQuantity) =>
                  onQuantityChange(attraction.id, newQuantity)
                }
              />
            ))}
          </div>
          <div className={styles.navigationContainer}>
            <button className={styles.navButton}>
              <svg
                width="41"
                height="41"
                viewBox="0 0 41 41"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.0563 21.1419C15.8868 20.9722 15.8022 20.7743 15.8023 20.5482C15.8025 20.3221 15.8874 20.1243 16.0571 19.9548L20.8087 15.2096C21.0916 14.9271 21.4025 14.8567 21.7416 14.9982C22.0807 15.1398 22.2501 15.4084 22.2498 15.8041L22.2434 25.301C22.2432 25.6967 22.0734 25.9651 21.7341 26.1062C21.3949 26.2473 21.084 26.1764 20.8015 25.8936L16.0563 21.1419ZM3.59207 20.54C3.59049 22.8859 4.03446 25.0909 4.92396 27.1548C5.81347 29.2187 7.02029 31.0143 8.54442 32.5416C10.0685 34.0689 11.8625 35.2781 13.9264 36.1693C15.9902 37.0604 18.1945 37.5074 20.5394 37.5101C22.8842 37.5128 25.0891 37.0688 27.1541 36.1782C29.2192 35.2875 31.0148 34.0807 32.541 32.5577C34.0671 31.0347 35.2764 29.2408 36.1687 27.1758C37.0609 25.1108 37.5079 22.9065 37.5095 20.5628C37.511 18.2191 37.0671 16.0142 36.1776 13.948C35.288 11.8818 34.0812 10.0862 32.5571 8.56119C31.033 7.03615 29.239 5.82635 27.1752 4.93181C25.1113 4.03726 22.907 3.5909 20.5622 3.59271C18.2173 3.59453 16.0124 4.03849 13.9474 4.92461C11.8823 5.81072 10.0867 7.01754 8.56055 8.54506C7.03437 10.0726 5.82458 11.8666 4.93117 13.927C4.03775 15.9874 3.59139 18.1918 3.59207 20.54Z"
                  fill="#424040"
                />
              </svg>
            </button>
            <button className={styles.navButton}>
              <svg
                width="41"
                height="41"
                viewBox="0 0 41 41"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M25.0453 21.141C25.2147 20.9713 25.2994 20.7733 25.2992 20.5472C25.2991 20.3211 25.2142 20.1233 25.0445 19.9538L20.2928 15.2086C20.01 14.9262 19.699 14.8557 19.36 14.9972C19.0209 15.1388 18.8515 15.4074 18.8517 15.8031L18.8581 25.3C18.8584 25.6957 19.0282 25.9641 19.3674 26.1052C19.7067 26.2463 20.0176 26.1754 20.3 25.8926L25.0453 21.141ZM37.5095 20.539C37.5111 22.885 37.0671 25.0899 36.1776 27.1538C35.2881 29.2177 34.0813 31.0133 32.5571 32.5406C31.033 34.0679 29.239 35.2772 27.1752 36.1683C25.1114 37.0595 22.907 37.5064 20.5622 37.5091C18.2174 37.5118 16.0125 37.0678 13.9474 36.1772C11.8824 35.2866 10.0868 34.0797 8.5606 32.5568C7.03442 31.0338 5.82519 29.2398 4.9329 27.1748C4.04062 25.1098 3.59369 22.9055 3.59211 20.5618C3.59054 18.2181 4.0345 16.0132 4.92401 13.947C5.81352 11.8809 7.02033 10.0853 8.54446 8.56022C10.0686 7.03517 11.8626 5.82538 13.9264 4.93083C15.9902 4.03628 18.1946 3.58992 20.5394 3.59173C22.8842 3.59355 25.0892 4.03752 27.1542 4.92363C29.2192 5.80975 31.0148 7.01656 32.541 8.54408C34.0672 10.0716 35.277 11.8656 36.1704 13.926C37.0638 15.9865 37.5102 18.1908 37.5095 20.539Z"
                  fill="#424040"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
