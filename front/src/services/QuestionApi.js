import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const questionApi = createApi({
    reducerPath: 'questionApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'api/game' }),
    endpoints: (builder) => ({
        // Fetch a question (GET /game/play)
        getQuestion: builder.query({
            query: () => '/play',
        }),

        // Submit an answer (POST /game/play)
        submitAnswer: builder.mutation({
            query: ({ questionHash, answer }) => ({
                url: '/play',
                method: 'POST',
                body: { questionHash, answer },
            }),
        }),
    }),
});

export const {
    useGetQuestionQuery,
    useSubmitAnswerMutation,
} = questionApi;