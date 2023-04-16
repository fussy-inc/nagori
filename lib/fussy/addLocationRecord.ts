import { CreateResponseInput } from "~/lib/graphql/graphql";
import { AnswerTypeEnum } from "../graphql/graphql";
import { FUSSY_API_URL } from "../constant";

const addLocationRecordQuery = `
  mutation AddLocationRecord($input: CreateResponseInput!) {
    createResponse(createResponseInput: $input) {
      response {
        id
      }
    }
  }
`;

type PlaceNameAnswer = {
  value: string;
  questionId: number;
};

type PlaceDescriptionAnswer = {
  value: string;
  questionId: number;
};

type PlaceGeoAnswer = {
  value: {
    latitude: number;
    longitude: number;
  };
  questionId: number;
};

type PlaceUrlAnswer = {
  value: string;
  questionId: number;
};

function buildResponseInput(
  formId: number,
  placeNameAnswer: PlaceNameAnswer,
  placeDescriptionAnswer: PlaceDescriptionAnswer,
  placeGeoAnswer: PlaceGeoAnswer,
  placeUrlAnswer: PlaceUrlAnswer
): CreateResponseInput {
  return {
    formId,
    answers: [
      {
        answerTypeEnum: AnswerTypeEnum.Text,
        questionId: placeNameAnswer.questionId,
        textAnswer: {
          value: placeNameAnswer.value,
        },
      },
      {
        answerTypeEnum: AnswerTypeEnum.Text,
        questionId: placeDescriptionAnswer.questionId,
        textAnswer: {
          value: placeDescriptionAnswer.value,
        },
      },
      {
        answerTypeEnum: AnswerTypeEnum.Location,
        questionId: placeGeoAnswer.questionId,
        locationAnswer: {
          latitude: placeGeoAnswer.value.latitude,
          longitude: placeGeoAnswer.value.longitude,
        },
      },
      {
        answerTypeEnum: AnswerTypeEnum.Url,
        questionId: placeUrlAnswer.questionId,
        textAnswer: {
          value: placeUrlAnswer.value,
        },
      },
    ],
  };
}

export default async function addLocationRecord(
  formId: number,
  placeNameAnswer: PlaceNameAnswer,
  placeDescriptionAnswer: PlaceDescriptionAnswer,
  placeGeoAnswer: PlaceGeoAnswer,
  placeUrlAnswer: PlaceUrlAnswer,
  accessToken: string
) {
  const createResponseInput = buildResponseInput(
    formId,
    placeNameAnswer,
    placeDescriptionAnswer,
    placeGeoAnswer,
    placeUrlAnswer
  );

  await fetch(FUSSY_API_URL + "/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Access-Token": accessToken,
    },
    body: JSON.stringify({
      query: addLocationRecordQuery,
      variables: {
        input: createResponseInput,
      },
    }),
  });
}
