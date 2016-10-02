module ArticleList exposing (..)

import Html exposing (..)
import Html.App as App
import Html.Attributes exposing (..)


main : Program Flags
main =
    App.programWithFlags
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }



-- Model


type alias Model =
    { articles : List Article }


type alias Flags =
    Model


type alias Article =
    { id : Int
    , title : String
    , url : String
    }


init : Flags -> ( Model, Cmd Msg )
init flags =
    ( Model flags.articles, Cmd.none )



-- View


view : Model -> Html Msg
view model =
    case model.articles of
        [] ->
            p [] [ text "Tidak ada artikel." ]

        articles ->
            ul [ class "list pa0" ] (List.map renderArticle articles)


renderArticle : Article -> Html Msg
renderArticle article =
    li []
        [ h3 [ class "f3 mb0" ]
            [ a [ href ("/artikel/" ++ (toString article.id)), class "dim link black-70" ]
                [ strong [] [ text article.title ] ]
            ]
        , div [ class "overview" ]
            [ div [ class "portal" ]
                [ a [ href "" ] [ text "Detik.com" ]
                , text " - "
                , a [ href article.url, target "_blank" ] [ text "Baca berita" ]
                ]
            ]
        , div [ class "stats" ]
            [ span [ class "rating" ] [ text "8/10" ]
            , text " - "
            , span [ class "review-count" ] [ text "4 Ulasan" ]
            , text " - "
            , span [ class "follower-count" ] [ text "Ikuti (127)" ]
            ]
        , div [ class "user" ]
            [ text "oleh "
            , a [ href "#" ] [ text "Bobby Priambodo" ]
            , text " "
              -- , text article.date_created
            , text "(3 hours ago)"
            ]
        ]



-- Update


type Msg
    = Nothing


update : Msg -> Model -> ( Model, Cmd Msg )
update message model =
    ( model, Cmd.none )



-- Subscriptions


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none
