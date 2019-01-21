[LocationRoutes]: img/Routes/LocationRoutes.PNG
[MeasurementsRoutes]: img/Routes/MeasurementsRoutes.PNG
[StationRoutes]: img/Routes/StationRoutes.PNG
[UserRoutes]: img/Routes/UserRoutes.PNG

[Home]: img/Pages/Home.PNG
[LocationNoStation]: img/Pages/LocationNoStation.PNG
[LocationWithStation]: img/Pages/LocationWithStation.PNG
[Login]: img/Pages/Login.PNG
[MyPage]: img/Pages/MyPage.PNG
[NewCard]: img/Pages/NewCard.PNG
[MyStations]: img/Pages/MyStations.PNG
[NewStation]: img/Pages/NewStation.PNG
[NewMeasurement]: img/Pages/NewMeasurement.PNG

# Wetr Web

WEA5 Projekt von David Maier

## Inhalt

- [1) Setup](#setup)
- [2) Api](#api)
- [3) Komponenten](#components)
- [4) Services](#services)

## 1) Setup

1) Starten Sie Docker
2) Wechseln sie in den Datenbank Ordner und führen den Befehl aus.

```sh
docker compose up -d
```

3) Gehen sie auf http://localhost:8080/ und melden Sie sich mit den Username ***root*** und Password ***root*** in die Wetr Datenbank an.
4) Importieren Sie das ***Wetr.sql*** und danach das ***Measurement_insert.sql*** File in die Datenbank
5) Starten Sie Wetr.WebService
6) Führen Sie folgendes Kommando aus
```sh
ng serve
```
7) Starten Sie einen Browser und gehen Sie auf http:://localhost:4200

## 2) API

Die REST-Schnittstelle wurde mit Swagger dokumentiert und mit NSwagStudio ein Client generiert.

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

