FROM azul/zulu-openjdk:21 AS builder

WORKDIR /duolender
COPY . .

RUN chmod +x ./gradlew
RUN ./gradlew clean bootJar -x test

FROM azul/zulu-openjdk:21
WORKDIR /duolender

COPY --from=builder /duolender/build/libs/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]