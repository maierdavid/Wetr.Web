[LocationRoutes]: doc/img/Routes/LocationRoutes.PNG
[MeasurementsRoutes]: doc/img/Routes/MeasurementsRoutes.PNG
[StationRoutes]: doc/img/Routes/StationRoutes.PNG
[UserRoutes]: doc/img/Routes/UserRoutes.PNG

[Home]: doc/img/Pages/Home.PNG
[LocationNoStation]: doc/img/Pages/LocationNoStation.PNG
[LocationWithStation]: doc/img/Pages/LocationWithStation.PNG
[Login]: doc/img/Pages/Login.PNG
[MyPage]: doc/img/Pages/MyPage.PNG
[NewCard]: doc/img/Pages/NewCard.PNG
[MyStations]: doc/img/Pages/MyStations.PNG
[NewStation]: doc/img/Pages/NewStation.PNG
[NewMeasurement]: doc/img/Pages/NewMeasurement.PNG

# Wetr Web

WEA5 Projekt von David Maier

## Inhalt

- [1) Ziel](#ziel)
- [2) Api](#api)
- [3) Komponenten](#components)
- [4) Services](#services)
- [5) Seiten](#seiten)

## 1) Ziel
Ziel des Projekts war es, eine Angular Applikation zu bauen, die aktuelle Wetterdaten von Wetterstationen anzeigt und auch graphisch aufbereitet. Für einen eingeloggten Nutzer soll zusätzlich das Festlegen von Präferenzen, die Verwaltung von Wetterstationen (hinzufügen, ändern, löschen) und das Eingeben von Wetterdaten möglich sein.


## 2) API

Diese Angular-App baut auf eine Rest-Schnittstelle aus einem anderen Projekt auf, diese wurde mit Swagger dokumentiert, dieses befindet sich unter /doc/swagger.json. Mit NSwagStudio wurde ein Angular Client dafür generiert.

![Verfügbare Location Routen][LocationRoutes]
![Verfügbare Measurement Routen][MeasurementsRoutes]
![Verfügbare Station Routen][StationRoutes]
![Verfügbare User Routen][UserRoutes]

## 3) Komponenten

* app.component
    * navbar
    * router-outlet
        * home
        * location
            * station
            * suggestion
        * login
        * personal-page
            * station-report
        * my-stations

## 4) Services

* authentication
* guard
* restclient

## 5) Seiten

### 5.1) Home
![Home][Home]
Auf der Home Seite kann der Benutzer nach einem Ort suchen, entweder mit dem Ortsnamen oder der Postleitzahl. Durch Drücken des Buttons wird er auf die Seite des Orts weitergeleitet. Die Home-Seite dient als Startseite.

### 5.2) Location
![LocationNoStation][LocationNoStation]
![LocationWithStation][LocationWithStation]
Hier werden alle Stationen, die im gesuchten Ort liegen, dargestellt. Es können sofort Abfragen über die aktuelle Wettersituation gemacht werden. Wenn es für den Ort keine Stationen gibt, werden Vorschläge geladen, für welche Orte in der Nähe es Stationen in der Datenbank gibt.

### 5.3) Login
![Login][Login]

### 5.4) Meine Seite
![MyPage][MyPage]
![NewCard][NewCard]
Auf dieser Seite werden dem User Zusammenfassungen von Stationen angezeigt. Er kann sich selbst aussuchen, für welche Stationen er welche Messdaten aus welchem Zeitraum sehen will. Aufgrund eines Problems bei Abfragen auf neue Daten werden hier lediglich Mockdaten angezeigt, für die realistische Zufallswerte generiert werden.

### 5.5) Meine Stationen
![MyStations][MyStations]
![NewStation][NewStation]
![NewMeasurement][NewMeasurement]
Hier kann der Nutzer alle seine Stationen sehen, bearbeiten und löschen. Es ist ihm auch möglich, eine neue Station zu erstellen, sowie Messungen für seine Stationen ins System einzugeben.

