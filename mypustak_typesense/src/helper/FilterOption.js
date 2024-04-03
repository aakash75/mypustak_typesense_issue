export const FilterOption = filterData => {
  // console.log({filterDataFun:filterData});
  return new Promise((resolve, reject) => {
    try {
      const Filter = {};
      filterData.map(facet => {
        // facet_author,facet_publication,facet_category,facet_language,facet_keywords,facet_bookType,facet_binding,facet_book_condition,facet_subject
        // console.log({ facet }, facet.field_name);
        if (
          facet.field_name == "language" ||
          facet.field_name == "facet_language"
        ) {
          let language = [];
          const BengaliLangArr = ["Bengali ", "Bangla", "Bengali"];
          facet.counts.map(data => {
            // console.log(data)
            if (BengaliLangArr.includes(data.value)) {
              if (!language.includes("Bengali")) {
                language.push("Bengali");
              }
            } else {
              if (!language.includes(data.value.toLowerCase())) {
                language.push(data.value.trim().toLowerCase());
              }
            }
          });
          Filter.language = language;
        }

        if (
          facet.field_name == "author" ||
          facet.field_name == "facet_author"
        ) {
          let author = [];
          const RemoveAuthor = [
            "NA",
            "N.A",
            "Na",
            "na",
            "None",
            "NONE",
            "none",
            "Nil",
            "nil",
            "",
          ];
          facet.counts.map(data => {
            // console.log(data);
            let author_name = data.value.trim();
            if (!RemoveAuthor.includes(author_name)) {
              if (!author.includes(author_name)) {
                author.push(author_name);
              }
            }
          });
          author = author.sort((a, b) => (a[0] > b[0] ? 1 : -1));
          // console.log({ facet_author: author });

          Filter.author = author;
        }

        if (
          facet.field_name == "publication" ||
          facet.field_name == "facet_publication"
        ) {
          let publication = [];
          const RemovePublication = [
            "NA",
            "N.A",
            "Na",
            "na",
            "None",
            "NONE",
            "none",
            "Nil",
            "nil",
            "",
          ];

          facet.counts.map(data => {
            // console.log(data);
            let pub_name = data.value;
            if (!RemovePublication.includes(pub_name.trim())) {
              if (!publication.includes(data.value.trim())) {
                publication.push(data.value.trim());
              }
            }
          });
          publication = publication.sort((a, b) => (a[0] > b[0] ? 1 : -1));
          Filter.publication = publication;
        }

        if (
          facet.field_name == "category" ||
          facet.field_name == "facet_category"
        ) {
          let category = [];
          facet.counts.map(data => {
            // console.log(data);
            category.push(data.value.trim());
          });
          Filter.category = category;
        }

        if (
          facet.field_name == "keywords" ||
          facet.field_name == "facet_keywords"
        ) {
          let keyword = [];
          facet.counts.map(data => {
            // console.log(data);
            if (data.value != "null") {
              keyword.push(data.value.trim());
            }
          });
          Filter.keyword = keyword;
        }

        if (
          facet.field_name == "book_type" ||
          facet.field_name == "facet_book_type"
        ) {
          let bookType = [];
          facet.counts.map(data => {
            // console.log(data);
            bookType.push(Number(data.value));
          });
          Filter.bookType = bookType;
        }

        if (
          facet.field_name == "binding" ||
          facet.field_name == "facet_binding"
        ) {
          let binding = [];
          facet.counts.map(data => {
            // console.log(data);
            let binding_type = data.value.trim();
            // console.log({ binding_type });
            const mustbeBinding = ["paperback", "hardback"];
            if (!binding.includes(binding_type)) {
              if (mustbeBinding.includes(binding_type.trim())) {
                binding.push(binding_type.trim());
              }
            }
          });
          Filter.binding = binding;
        }

        if (
          facet.field_name == "book_condition" ||
          facet.field_name == "facet_book_condition"
        ) {
          let book_condition = [];
          const mustBeConditions = [
            "verygood",
            "averagebutinreadablecondition",
            "almostnew",
            "brandnew",
          ];
          facet.counts.map(data => {
            let cond_arr = data.value.split(":");
            let cond = cond_arr[1]
              .replace(/"/g, "")
              .replace(/}/g, "")
              .replace(/'/g, "")
              .replace(/ /g, "");
            // console.log(cond[1].replace(/"/g, '').replace(/}/g, ''), 'book_condition');
            // console.log({ cond });
            if (mustBeConditions.includes(cond.trim())) {
              book_condition.push(cond.trim());
            }
          });
          // console.log({ book_condition });

          Filter.book_condition = book_condition;
        }

        if (
          facet.field_name == "subject" ||
          facet.field_name == "facet_subject"
        ) {
          let subject = [];
          facet.counts.map(data => {
            // console.log(data);
            if (data.value != "None" && data.value != "D") {
              // console.log(data.value, 'subject---');

              subject.push(data.value.trim());
            }
          });
          Filter.subject = subject;
        }

        if (facet.field_name == "class" || facet.field_name == "facet_class") {
          let classes = [];
          facet.counts.map(data => {
            //    console.log(data);
            if (data.length) {
              classes.push(data.value.trim());
            }
          });
          Filter.classes = classes;
        }
      });

      resolve(Filter);
    } catch (error) {
      // console.log(Filter);

      reject(error);
    }
  });
};
