import { AnswerTypeEnum, CreateFormInput } from "~/lib/graphql/graphql";
import { FUSSY_API_URL } from "~/lib/constant";

type Category = {
  id: number;
  title: string;
};

const createFormQuery = /* GraphQL */ `
  mutation CreateForm($createFormInput: CreateFormInput!) {
    createForm(input: $createFormInput) {
      form {
        id
      }
    }
  }
`;

function buildFormInputs(category: Category): {
  createLocationFormInput: CreateFormInput;
  createCheckInFormInput: CreateFormInput;
} {
  const createLocationFormInput = {
    form: {
      title: `「${category.title}」の聖地`,
      description: `「${category.title}」の聖地巡礼のためのデータベースです。`,
      categoryIds: [category.id],
      questions: [
        {
          content: "場所の名前",
          position: 0,
          answerTypeEnum: AnswerTypeEnum.Text,
        },
        {
          content: "場所の説明",
          position: 1,
          answerTypeEnum: AnswerTypeEnum.Text,
        },
        {
          content: "場所の位置情報",
          position: 2,
          answerTypeEnum: AnswerTypeEnum.Location,
        },
        {
          content: "場所のURL",
          position: 3,
          answerTypeEnum: AnswerTypeEnum.Url,
        },
      ],
    },
  };

  const createCheckInFormInput = {
    form: {
      title: `${category.title}の聖地巡礼感想`,
      description: `「${category.title}」の聖地巡礼の感想を記録するためのデータベースです。`,
      categoryIds: [category.id],
      questions: [
        {
          content: "訪問した場所",
          position: 0,
          answerTypeEnum: AnswerTypeEnum.Text,
        },
        {
          content: "感想",
          position: 1,
          answerTypeEnum: AnswerTypeEnum.Text,
        },
        {
          content: "参照",
          position: 2,
          answerTypeEnum: AnswerTypeEnum.Reference,
        },
      ],
    },
  };

  return {
    createLocationFormInput,
    createCheckInFormInput,
  };
}

export default async function createLocationForm(
  category: Category,
  accessToken: string
) {
  const { createLocationFormInput, createCheckInFormInput } =
    buildFormInputs(category);

  await fetch(FUSSY_API_URL + "/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Access-Token": accessToken,
    },
    body: JSON.stringify({
      query: createFormQuery,
      variables: {
        createFormInput: createLocationFormInput,
      },
    }),
  });

  await fetch(FUSSY_API_URL + "/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Access-Token": accessToken,
    },
    body: JSON.stringify({
      query: createFormQuery,
      variables: {
        createFormInput: createCheckInFormInput,
      },
    }),
  });
}
