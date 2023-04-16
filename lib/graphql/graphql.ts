/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** An ISO 8601-encoded datetime */
  ISO8601DateTime: any;
};

export type AnswerInput = {
  answerTypeEnum: AnswerTypeEnum;
  locationAnswer?: InputMaybe<LocationAnswerInput>;
  numberAnswer?: InputMaybe<NumberAnswerInput>;
  questionId: Scalars["Int"];
  referenceAnswer?: InputMaybe<ReferenceAnswerInput>;
  textAnswer?: InputMaybe<TextAnswerInput>;
};

export enum AnswerTypeEnum {
  /** Image URL */
  ImageUrl = "image_url",
  /** Location */
  Location = "location",
  /** Number */
  Number = "number",
  /** Reference */
  Reference = "reference",
  /** Text */
  Text = "text",
  /** URL */
  Url = "url",
}

/** Union of answer types */
export type AnswerUnion =
  | LocationAnswer
  | NumberAnswer
  | ReferenceAnswer
  | TextAnswer;

export type Category = {
  __typename?: "Category";
  createdAt: Scalars["ISO8601DateTime"];
  furigana: Scalars["String"];
  id: Scalars["Int"];
  imageUrl?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  updatedAt: Scalars["ISO8601DateTime"];
};

export enum CategoryColumnEnum {
  /** created_at */
  CreatedAt = "CREATED_AT",
  /** furigana */
  Furigana = "FURIGANA",
  /** id */
  Id = "ID",
  /** name */
  Name = "NAME",
}

/** Autogenerated input type of CreateForm */
export type CreateFormInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  form: FormInput;
};

/** Autogenerated return type of CreateForm. */
export type CreateFormPayload = {
  __typename?: "CreateFormPayload";
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars["String"]>;
  errors: Array<Scalars["String"]>;
  form?: Maybe<Form>;
};

/** Autogenerated input type of CreateResponse */
export type CreateResponseInput = {
  answers: Array<AnswerInput>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  formId: Scalars["Int"];
};

/** Autogenerated return type of CreateResponse. */
export type CreateResponsePayload = {
  __typename?: "CreateResponsePayload";
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars["String"]>;
  errors: Array<Scalars["String"]>;
  response?: Maybe<Response>;
};

export type Form = {
  __typename?: "Form";
  categories: Array<Category>;
  createdAt: Scalars["ISO8601DateTime"];
  description: Scalars["String"];
  id: Scalars["Int"];
  questions: Array<Question>;
  title: Scalars["String"];
  updatedAt: Scalars["ISO8601DateTime"];
  user: User;
  userId: Scalars["Int"];
};

export type FormInput = {
  categoryIds: Array<Scalars["Int"]>;
  description: Scalars["String"];
  questions: Array<QuestionInput>;
  title: Scalars["String"];
};

export type GeoLocation = {
  __typename?: "GeoLocation";
  latitude: Scalars["Float"];
  longitude: Scalars["Float"];
};

/** Autogenerated input type of IssueFussyAccessToken */
export type IssueFussyAccessTokenInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  sessionId: Scalars["String"];
};

/** Autogenerated return type of IssueFussyAccessToken. */
export type IssueFussyAccessTokenPayload = {
  __typename?: "IssueFussyAccessTokenPayload";
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars["String"]>;
};

export type LocationAnswer = {
  __typename?: "LocationAnswer";
  createdAt: Scalars["ISO8601DateTime"];
  id: Scalars["Int"];
  position: Scalars["Int"];
  question: Question;
  questionId: Scalars["Int"];
  response: Response;
  responseId: Scalars["Int"];
  updatedAt: Scalars["ISO8601DateTime"];
  value: GeoLocation;
};

export type LocationAnswerInput = {
  latitude: Scalars["Float"];
  longitude: Scalars["Float"];
};

export type LocationNearInput = {
  /** the unit is `meter` */
  distance: Scalars["Float"];
  latitude: Scalars["Float"];
  longitude: Scalars["Float"];
};

export type Mutation = {
  __typename?: "Mutation";
  createForm?: Maybe<CreateFormPayload>;
  createResponse?: Maybe<CreateResponsePayload>;
  /** you can get access token at once */
  issueFussyAccessToken?: Maybe<IssueFussyAccessTokenPayload>;
};

export type MutationCreateFormArgs = {
  input: CreateFormInput;
};

export type MutationCreateResponseArgs = {
  input: CreateResponseInput;
};

export type MutationIssueFussyAccessTokenArgs = {
  input: IssueFussyAccessTokenInput;
};

export type NumberAnswer = {
  __typename?: "NumberAnswer";
  createdAt: Scalars["ISO8601DateTime"];
  id: Scalars["Int"];
  position: Scalars["Int"];
  question: Question;
  questionId: Scalars["Int"];
  response: Response;
  responseId: Scalars["Int"];
  updatedAt: Scalars["ISO8601DateTime"];
  value: Scalars["Int"];
};

export type NumberAnswerInput = {
  value: Scalars["Int"];
};

export enum OrderEnum {
  /** Ascending order */
  Asc = "asc",
  /** Descending order */
  Desc = "desc",
}

export type Query = {
  __typename?: "Query";
  categories: Array<Category>;
  form: Form;
  forms: Array<Form>;
  /** current user's data. need access token */
  me: User;
  response: Response;
  responses: Array<Response>;
  /** find a user by access token */
  userByAccessToken?: Maybe<User>;
};

export type QueryCategoriesArgs = {
  column?: InputMaybe<CategoryColumnEnum>;
  ids?: InputMaybe<Array<Scalars["Int"]>>;
  limit?: InputMaybe<Scalars["Int"]>;
  order?: InputMaybe<OrderEnum>;
};

export type QueryFormArgs = {
  id: Scalars["Int"];
};

export type QueryFormsArgs = {
  categoryIds?: InputMaybe<Array<Scalars["Int"]>>;
  ids?: InputMaybe<Array<Scalars["Int"]>>;
  locationNearby?: InputMaybe<LocationNearInput>;
};

export type QueryResponseArgs = {
  id: Scalars["Int"];
};

export type QueryResponsesArgs = {
  categoryIds?: InputMaybe<Array<Scalars["Int"]>>;
  ids?: InputMaybe<Array<Scalars["Int"]>>;
  locationNearby?: InputMaybe<LocationNearInput>;
};

export type QueryUserByAccessTokenArgs = {
  accessToken: Scalars["String"];
};

export type Question = {
  __typename?: "Question";
  answerType: Scalars["String"];
  content: Scalars["String"];
  createdAt: Scalars["ISO8601DateTime"];
  form: Form;
  formId: Scalars["Int"];
  id: Scalars["Int"];
  position: Scalars["Int"];
  updatedAt: Scalars["ISO8601DateTime"];
};

export type QuestionInput = {
  answerTypeEnum: AnswerTypeEnum;
  content: Scalars["String"];
  position: Scalars["Int"];
};

export type ReferenceAnswer = {
  __typename?: "ReferenceAnswer";
  createdAt: Scalars["ISO8601DateTime"];
  id: Scalars["Int"];
  position: Scalars["Int"];
  updatedAt: Scalars["ISO8601DateTime"];
  /** referenced response id */
  value: Scalars["Int"];
};

export type ReferenceAnswerInput = {
  value: Scalars["Int"];
};

export type Response = {
  __typename?: "Response";
  answers: Array<AnswerUnion>;
  form: Form;
  formId: Scalars["Int"];
  id: Scalars["Int"];
  user: User;
  userId: Scalars["Int"];
};

export type TextAnswer = {
  __typename?: "TextAnswer";
  id: Scalars["Int"];
  position: Scalars["Int"];
  question: Question;
  questionId: Scalars["Int"];
  response: Response;
  responseId: Scalars["Int"];
  value: Scalars["String"];
};

export type TextAnswerInput = {
  value: Scalars["String"];
};

export type User = {
  __typename?: "User";
  bio?: Maybe<Scalars["String"]>;
  createdAt: Scalars["ISO8601DateTime"];
  id: Scalars["Int"];
  name: Scalars["String"];
  updatedAt: Scalars["ISO8601DateTime"];
};

export type FetchNearLocationsQueryVariables = Exact<{
  latitude: Scalars["Float"];
  longitude: Scalars["Float"];
  distance: Scalars["Float"];
}>;

export type FetchNearLocationsQuery = {
  __typename?: "Query";
  responses: Array<{
    __typename?: "Response";
    id: number;
    answers: Array<
      | {
          __typename: "LocationAnswer";
          id: number;
          position: number;
          locationValue: {
            __typename?: "GeoLocation";
            latitude: number;
            longitude: number;
          };
        }
      | {
          __typename: "NumberAnswer";
          id: number;
          position: number;
          numberValue: number;
        }
      | { __typename?: "ReferenceAnswer" }
      | {
          __typename: "TextAnswer";
          id: number;
          position: number;
          textValue: string;
        }
    >;
    form: {
      __typename?: "Form";
      id: number;
      categories: Array<{ __typename?: "Category"; id: number; name: string }>;
    };
  }>;
};

export const FetchNearLocationsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "fetchNearLocations" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "latitude" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Float" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "longitude" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Float" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "distance" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Float" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "responses" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "locationNearby" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "latitude" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "latitude" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "longitude" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "longitude" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "distance" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "distance" },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "answers" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: { kind: "Name", value: "LocationAnswer" },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              alias: { kind: "Name", value: "locationValue" },
                              name: { kind: "Name", value: "value" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "latitude" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "longitude" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "position" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "__typename" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: { kind: "Name", value: "TextAnswer" },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              alias: { kind: "Name", value: "textValue" },
                              name: { kind: "Name", value: "value" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "position" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "__typename" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: { kind: "Name", value: "NumberAnswer" },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              alias: { kind: "Name", value: "numberValue" },
                              name: { kind: "Name", value: "value" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "position" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "__typename" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "form" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "categories" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FetchNearLocationsQuery,
  FetchNearLocationsQueryVariables
>;