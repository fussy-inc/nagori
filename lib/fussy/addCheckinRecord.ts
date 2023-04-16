import { AnswerTypeEnum, CreateResponseInput } from "~/lib/graphql/graphql";
import { FUSSY_API_URL } from "~/lib/constant";

type VisitedPlaceNameAnswer = {
  value: string;
  questionId: number;
};

type VisitedPlaceImpressionAnswer = {
  value: string;
  questionId: number;
};

type ReferencedFussyRecordAnswer = {
  value: number;
  questionId: number;
};

function buildCheckInFormInput(
  formId: number,
  visitedPlaceNameAnswer: VisitedPlaceNameAnswer,
  visitedPlaceImpressionAnswer: VisitedPlaceImpressionAnswer,
  referencedFussyRecordAnswer: ReferencedFussyRecordAnswer
): CreateResponseInput {
  return {
    formId,
    answers: [
      {
        questionId: visitedPlaceNameAnswer.questionId,
        answerTypeEnum: AnswerTypeEnum.Text,
        textAnswer: {
          value: visitedPlaceNameAnswer.value,
        },
      },
      {
        questionId: visitedPlaceNameAnswer.questionId,
        answerTypeEnum: AnswerTypeEnum.Text,
        textAnswer: {
          value: visitedPlaceImpressionAnswer.value,
        },
      },
      {
        questionId: referencedFussyRecordAnswer.questionId,
        answerTypeEnum: AnswerTypeEnum.Reference,
        referenceAnswer: {
          value: referencedFussyRecordAnswer.value,
        },
      },
    ],
  };
}

const checkInQuery = /* GraphQL */ `
  mutation CheckIn($input: CreateResponseInput!) {
    createResponse(input: $input) {
      response {
        id
      }
    }
  }
`;

export default async function addCheckinRecord(
  formId: number,
  visitedPlaceNameAnswer: VisitedPlaceNameAnswer,
  visitedPlaceImpressionAnswer: VisitedPlaceImpressionAnswer,
  referencedFussyRecordAnswer: ReferencedFussyRecordAnswer,
  accessToken: string
): Promise<void> {
  const createResponseInput = buildCheckInFormInput(
    formId,
    visitedPlaceNameAnswer,
    visitedPlaceImpressionAnswer,
    referencedFussyRecordAnswer
  );

  await fetch(FUSSY_API_URL + "/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Access-Token": accessToken,
    },
    body: JSON.stringify({
      query: checkInQuery,
      variables: {
        input: createResponseInput,
      },
    }),
  });
}
