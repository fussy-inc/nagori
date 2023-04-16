import { Failure, Result, Success } from "~/lib/result";
import { FUSSY_API_URL } from "~/lib/constant";

const fetchCheckinFormQuery = /* GraphQL */ `
  query fetchCheckinForm($id: Int!) {
    form(id: $id) {
      id
      questions {
        id
        position
      }
    }
  }
`;

type CheckinFormResponse = {
  form: {
    id: number;
    questions: {
      id: number;
      position: number;
    }[];
  };
};

async function fetchCheckinForm(
  id: number
): Promise<Result<CheckinFormResponse, Error>> {
  const response = await fetch(FUSSY_API_URL + "/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: fetchCheckinFormQuery,
      variables: {
        id,
      },
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    const error = errors[0];
    return new Failure(new Error(error.message));
  } else {
    return new Success(data);
  }
}

export default fetchCheckinForm;
