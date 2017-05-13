package com.ajegames.storytime.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.common.base.Objects;

/**
 * Information about the state of the service.
 */
public class Status {

    private String salutation;
    private String status;
    private String version;

    public static Status create(String salutation, String status, String version) {
        Status statusOut = new Status();
        statusOut.salutation = salutation;
        statusOut.status = status;
        statusOut.version = version;
        return statusOut;
    }

    @JsonProperty
    public String getSalutation() {
        return salutation;
    }

    @JsonProperty
    public String getStatus() {
        return status;
    }

    @JsonProperty
    public String getVersion() {
        return version;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Status status1 = (Status) o;
        return Objects.equal(getSalutation(), status1.getSalutation()) &&
                Objects.equal(getStatus(), status1.getStatus()) &&
                Objects.equal(getVersion(), status1.getVersion());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getSalutation(), getStatus(), getVersion());
    }

    @Override
    public String toString() {
        return "Status{" +
                "salutation='" + salutation + '\'' +
                ", status='" + status + '\'' +
                ", version='" + version + '\'' +
                '}';
    }
}
