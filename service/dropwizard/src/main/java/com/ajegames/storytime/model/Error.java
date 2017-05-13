package com.ajegames.storytime.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.common.base.Objects;

/**
 * Payload to return to client when something has gone wrong with REST call.
 */
public class Error {

    private String errorCode;
    private String message;

    public static Error create(final String errorCode, final String message) {
        final Error error = new Error();
        error.errorCode = errorCode;
        error.message = message;
        return error;
    }

    @JsonProperty
    public String getErrorCode() {
        return errorCode;
    }

    @JsonProperty
    public String getMessage() {
        return message;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Error error = (Error) o;
        return Objects.equal(errorCode, error.errorCode) &&
                Objects.equal(message, error.message);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(errorCode, message);
    }

    @Override
    public String toString() {
        return "Error{" +
                "errorCode='" + errorCode + '\'' +
                ", message='" + message + '\'' +
                '}';
    }
}
