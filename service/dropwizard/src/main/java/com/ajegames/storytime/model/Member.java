package com.ajegames.storytime.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.common.base.Objects;

import java.util.Date;

/**
 * A known player.
 */
public class Member {

    private String screenName;
    private String id;
    private String identityProvider;  // ought to be an enum with Facebook and Google for starters
    private String email;
    private Date joinedAt;
    private boolean communicationOkay;

    public static Member create(String screenName, String id, String identityProvider, String email,
                  Date joinedAt, boolean communicationOkay) {
        Member member = new Member();
        member.screenName = screenName;
        member.id = id;
        member.identityProvider = identityProvider;
        member.email = email;
        member.joinedAt = joinedAt;
        member.communicationOkay = communicationOkay;
        return member;
    }

    @JsonProperty
    public String getScreenName() {
        return screenName;
    }

    @JsonProperty
    public String getId() {
        return id;
    }

    @JsonProperty
    public String getIdentityProvider() {
        return identityProvider;
    }

    @JsonProperty
    public String getEmail() {
        return email;
    }

    @JsonProperty
    public Date getJoinedAt() {
        return joinedAt;
    }

    @JsonProperty
    public boolean isCommunicationOkay() {
        return communicationOkay;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Member member = (Member) o;
        return isCommunicationOkay() == member.isCommunicationOkay() &&
                Objects.equal(getScreenName(), member.getScreenName()) &&
                Objects.equal(getId(), member.getId()) &&
                Objects.equal(getIdentityProvider(), member.getIdentityProvider()) &&
                Objects.equal(getEmail(), member.getEmail()) &&
                Objects.equal(getJoinedAt(), member.getJoinedAt());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getScreenName(), getId(), getIdentityProvider(), getEmail(),
                getJoinedAt(), isCommunicationOkay());
    }

    @Override
    public String toString() {
        return "Member{" +
                "screenName='" + screenName + '\'' +
                ", id='" + id + '\'' +
                ", identityProvider='" + identityProvider + '\'' +
                ", email='" + email + '\'' +
                ", joinedAt=" + joinedAt +
                ", communicationOkay=" + communicationOkay +
                '}';
    }
}
