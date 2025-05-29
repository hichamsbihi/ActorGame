import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const questionApi = createApi({
    reducerPath: 'questionApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/back' }),
    endpoints: (builder) => ({
        // Fetch a question (GET /game/play)
        getQuestion: builder.query({
            query: () => '/',
        }),

        // Submit an answer (POST /game/play)
        submitAnswer: builder.mutation({
            query: ({ questionHash, answer }) => ({
                url: '/',
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