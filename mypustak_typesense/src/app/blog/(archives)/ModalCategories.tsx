"use client";

import React, { FC } from "react";
import { TaxonomyType, CategoryType } from "@/data/types";
import CardCategory1 from "@/components/CardCategory1/CardCategory1";
import NcModal from "@/components/NcModal/NcModal";
import Button from "@/components/Button/Button";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

export interface ModalCategoriesProps {
  categories: CategoryType[];
}

const ModalCategories: FC<ModalCategoriesProps> = ({ categories }) => {

  const renderModalContent = () => {
    return (
      <div className="grid gap-6 sm:grid-cols-2 sm:py-2 md:gap-8 md:grid-cols-3 lg:grid-cols-4 xl:md:grid-cols-5">
        {categories?.map((cat) => (
          <CardCategory1 key={cat.id} categoriesData={cat} size="normal" />
        ))}
      </div>
    );
  };

  return (
    <div className="nc-ModalCategories">
      <NcModal
        renderTrigger={(openModal) => (
          <Button
            pattern="third"
            fontSize="text-sm font-medium"
            handleSubmit={openModal}
          >
            <div className="text-blue-800">
              <span className="hidden sm:inline text-blue-800 ">Other</span> Categories
            </div>
            <ChevronDownIcon
              className="w-4 h-4 ms-2 -me-1"
              aria-hidden="true"
            />
          </Button>
        )}
        modalTitle="Discover other categories"
        renderContent={renderModalContent}
      />
    </div>
  );
};

export default ModalCategories;
